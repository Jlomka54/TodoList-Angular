export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: number;
  userId?: number;
  title: string;
  completed: boolean;
  priority: TodoPriority;
  isLocal?: boolean;
}
