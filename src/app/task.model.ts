export type TaskStatus = 'To do' | 'In progress' | 'Done';
export type TaskPriority = 'High' | 'Medium' | 'Low';

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export const TASK_STATUSES: TaskStatus[] = ['To do', 'In progress', 'Done'];
export const TASK_PRIORITIES: TaskPriority[] = ['High', 'Medium', 'Low'];
