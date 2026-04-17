import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storageKey = 'todos';
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getTodos(): Todo[] {
    if (!this.isBrowser) {
      return [];
    }

    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveTodos(todos: Todo[]): void {
    if (!this.isBrowser) {
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }

  clearTodos(): void {
    if (!this.isBrowser) {
      return;
    }

    localStorage.removeItem(this.storageKey);
  }
}
