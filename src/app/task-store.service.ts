import { Injectable, signal } from '@angular/core';
import { TaskItem } from './task.model';

const STORAGE_KEY = 'taskflow-board-v2';

function localDateOffset(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function makeId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function seedTasks(): TaskItem[] {
  const now = new Date().toISOString();
  return [
    { id: makeId(), title: 'Map the onboarding journey', description: 'Outline the first five minutes and note where new users need a little guidance.', status: 'In progress', priority: 'High', dueDate: localDateOffset(1), category: 'Product', createdAt: now, updatedAt: now },
    { id: makeId(), title: 'Review the mobile navigation', description: 'Check the small-screen menu against the latest layout notes.', status: 'To do', priority: 'Medium', dueDate: localDateOffset(2), category: 'Design', createdAt: now, updatedAt: now },
    { id: makeId(), title: 'Share the sprint summary', description: 'Collect decisions, open questions and the next owners in one short update.', status: 'Done', priority: 'Low', dueDate: localDateOffset(-1), category: 'Planning', createdAt: now, updatedAt: now },
    { id: makeId(), title: 'Draft the feedback prompts', description: 'Keep the questions specific, short and easy to answer.', status: 'To do', priority: 'High', dueDate: localDateOffset(3), category: 'Research', createdAt: now, updatedAt: now },
    { id: makeId(), title: 'Polish empty states', description: 'Give each empty view a clear next step and a friendly explanation.', status: 'In progress', priority: 'Medium', dueDate: localDateOffset(4), category: 'Design', createdAt: now, updatedAt: now },
    { id: makeId(), title: 'Tidy component notes', description: 'Capture the usage examples beside the shared interface patterns.', status: 'To do', priority: 'Low', dueDate: localDateOffset(5), category: 'Product', createdAt: now, updatedAt: now },
  ];
}

function loadTasks(): TaskItem[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    if (Array.isArray(stored) && stored.every(isTaskItem)) return stored;
  } catch {
    // Start with sample work when storage is absent or unreadable.
  }
  return seedTasks();
}

function isTaskItem(value: unknown): value is TaskItem {
  if (typeof value !== 'object' || value === null) return false;
  const task = value as Record<string, unknown>;
  return typeof task['id'] === 'string'
    && typeof task['title'] === 'string'
    && typeof task['description'] === 'string'
    && ['To do', 'In progress', 'Done'].includes(String(task['status']))
    && ['High', 'Medium', 'Low'].includes(String(task['priority']))
    && typeof task['dueDate'] === 'string'
    && typeof task['category'] === 'string'
    && typeof task['createdAt'] === 'string'
    && typeof task['updatedAt'] === 'string';
}

@Injectable({ providedIn: 'root' })
export class TaskStoreService {
  readonly tasks = signal<TaskItem[]>(loadTasks());

  create(task: Omit<TaskItem, 'id' | 'createdAt' | 'updatedAt'>): void {
    const now = new Date().toISOString();
    this.commit([{ ...task, id: makeId(), createdAt: now, updatedAt: now }, ...this.tasks()]);
  }

  update(id: string, changes: Omit<TaskItem, 'id' | 'createdAt' | 'updatedAt'>): void {
    const now = new Date().toISOString();
    this.commit(this.tasks().map((task) => task.id === id ? { ...task, ...changes, updatedAt: now } : task));
  }

  remove(id: string): void {
    this.commit(this.tasks().filter((task) => task.id !== id));
  }

  setStatus(id: string, status: TaskItem['status']): void {
    const now = new Date().toISOString();
    this.commit(this.tasks().map((task) => task.id === id ? { ...task, status, updatedAt: now } : task));
  }

  private commit(tasks: TaskItem[]): void {
    this.tasks.set(tasks);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // The board remains usable for this browser session if storage is blocked.
    }
  }
}
