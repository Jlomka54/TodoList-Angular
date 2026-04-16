import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api';
import { StorageService } from './storage';
import { Todo, TodoPriority } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
  ) {}

  loadTodos(): Observable<Todo[]> {
    const savedTodos = this.storageService.getTodos();

    if (savedTodos.length > 0) {
      return of(savedTodos);
    }

    return this.apiService.getTodos().pipe(
      map((todos) => {
        const preparedTodos: Todo[] = todos.slice(0, 15).map((todo) => ({
          id: todo.id,
          userId: todo.userId,
          title: todo.title,
          completed: todo.completed,
          priority: 'medium',
        }));

        this.storageService.saveTodos(preparedTodos);
        return preparedTodos;
      }),
    );
  }

  getTodosFromStorage(): Todo[] {
    return this.storageService.getTodos();
  }

  addTodo(title: string, priority: TodoPriority): Todo[] {
    const todos = this.storageService.getTodos();

    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      priority,
      isLocal: true,
    };

    const updatedTodos = [newTodo, ...todos];
    this.storageService.saveTodos(updatedTodos);

    return updatedTodos;
  }

  deleteTodo(id: number): Todo[] {
    const todos = this.storageService.getTodos();
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    this.storageService.saveTodos(updatedTodos);
    return updatedTodos;
  }

  toggleCompleted(id: number): Todo[] {
    const todos = this.storageService.getTodos();

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    this.storageService.saveTodos(updatedTodos);
    return updatedTodos;
  }

  updateTodo(updatedTodo: Todo): Todo[] {
    const todos = this.storageService.getTodos();

    const updatedTodos = todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));

    this.storageService.saveTodos(updatedTodos);
    return updatedTodos;
  }

  sortByPriority(todos: Todo[]): Todo[] {
    const priorityOrder: Record<TodoPriority, number> = {
      low: 1,
      medium: 2,
      high: 3,
    };

    return [...todos].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
  }
}
