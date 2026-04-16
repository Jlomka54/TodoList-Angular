import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storageKey = 'todos';

  getTodos(): Todo[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }

  clearTodos(): void {
    localStorage.removeItem(this.storageKey);
  }
}
