import { ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskItem, TaskPriority, TaskStatus, TASK_PRIORITIES, TASK_STATUSES } from './task.model';
import { TaskStoreService } from './task-store.service';

type StatusFilter = 'All work' | 'To do' | 'In progress' | 'Done';

@Component({
  selector: 'taskflow-root',
  standalone: true,
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly store = inject(TaskStoreService);
  private readonly formBuilder = inject(FormBuilder).nonNullable;

  readonly statuses = TASK_STATUSES;
  readonly priorities = TASK_PRIORITIES;
  readonly statusFilter = signal<StatusFilter>('All work');
  readonly search = signal('');
  readonly categoryFilter = signal('All areas');
  readonly viewMode = signal<'board' | 'list'>('board');
  readonly dialogOpen = signal(false);
  readonly editing = signal<TaskItem | null>(null);
  readonly toast = signal('');
  @ViewChild('searchInput') private searchInput?: ElementRef<HTMLInputElement>;

  readonly categories = computed(() => ['All areas', ...new Set(this.store.tasks().map((task) => task.category).filter(Boolean))]);
  readonly allTasks = this.store.tasks.asReadonly();
  readonly visibleTasks = computed(() => {
    const query = this.search().trim().toLocaleLowerCase();
    return this.store.tasks().filter((task) => {
      const matchesStatus = this.statusFilter() === 'All work' || task.status === this.statusFilter();
      const matchesCategory = this.categoryFilter() === 'All areas' || task.category === this.categoryFilter();
      const matchesQuery = !query || `${task.title} ${task.description} ${task.category}`.toLocaleLowerCase().includes(query);
      return matchesStatus && matchesCategory && matchesQuery;
    });
  });
  readonly columns = computed(() => this.statuses.map((status) => ({
    status,
    tasks: this.visibleTasks().filter((task) => task.status === status),
  })));
  readonly completedCount = computed(() => this.store.tasks().filter((task) => task.status === 'Done').length);
  readonly openCount = computed(() => this.store.tasks().filter((task) => task.status !== 'Done').length);
  readonly dueSoonCount = computed(() => this.store.tasks().filter((task) => task.status !== 'Done' && task.dueDate <= this.today()).length);
  readonly completionPercent = computed(() => this.store.tasks().length ? Math.round(this.completedCount() / this.store.tasks().length * 100) : 0);
  readonly form = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(90)]],
    description: ['', [Validators.maxLength(260)]],
    status: ['To do' as TaskStatus, Validators.required],
    priority: ['Medium' as TaskPriority, Validators.required],
    dueDate: [this.dateOffset(3), Validators.required],
    category: ['Product', [Validators.required, Validators.maxLength(24)]],
  });

  @HostListener('document:keydown', ['$event'])
  onGlobalKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.dialogOpen()) this.closeDialog();
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.searchInput?.nativeElement.focus();
    }
  }

  today(): string {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }

  todayLabel(): string {
    return new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());
  }

  dateOffset(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  dueLabel(date: string): string {
    if (!date) return 'No due date';
    const [year, month, day] = date.split('-').map(Number);
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(new Date(year, month - 1, day));
  }

  dueState(task: TaskItem): string {
    if (task.status === 'Done') return 'date-done';
    if (task.dueDate < this.today()) return 'date-overdue';
    if (task.dueDate === this.today()) return 'date-today';
    return '';
  }

  setStatusFilter(filter: StatusFilter): void { this.statusFilter.set(filter); }
  setSearch(event: Event): void { this.search.set((event.target as HTMLInputElement).value); }
  setCategory(event: Event): void { this.categoryFilter.set((event.target as HTMLSelectElement).value); }
  setStatus(task: TaskItem, event: Event): void { this.store.setStatus(task.id, (event.target as HTMLSelectElement).value as TaskStatus); }

  openCreate(status: TaskStatus = 'To do'): void {
    this.editing.set(null);
    this.form.reset({ title: '', description: '', status, priority: 'Medium', dueDate: this.dateOffset(3), category: 'Product' });
    this.dialogOpen.set(true);
  }

  openEdit(task: TaskItem): void {
    this.editing.set(task);
    this.form.reset({ title: task.title, description: task.description, status: task.status, priority: task.priority, dueDate: task.dueDate, category: task.category });
    this.dialogOpen.set(true);
  }

  closeDialog(): void { this.dialogOpen.set(false); this.editing.set(null); }

  saveTask(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const task = this.form.getRawValue();
    const existing = this.editing();
    if (existing) {
      this.store.update(existing.id, task);
      this.showToast('Your changes are saved.');
    } else {
      this.store.create(task);
      this.showToast('Task added to your board.');
    }
    this.closeDialog();
  }

  removeTask(task: TaskItem): void {
    if (!window.confirm(`Delete “${task.title}”? This only removes it from this browser.`)) return;
    this.store.remove(task.id);
    this.showToast('Task removed.');
  }

  exportBoard(): void {
    const file = new Blob([JSON.stringify(this.store.tasks(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'taskflow-board.json';
    link.click();
    URL.revokeObjectURL(url);
    this.showToast('Board backup downloaded.');
  }

  private showToast(message: string): void {
    this.toast.set(message);
    window.setTimeout(() => this.toast.set(''), 2600);
  }
}
