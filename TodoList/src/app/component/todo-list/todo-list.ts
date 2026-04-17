import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Todo, TodoPriority } from '../../models/todo';
import { TodoService } from '../../services/todo';
import { TodoEdit } from '../todo-edit/todo-edit';
import { TodoFiltr } from '../todo-filtr/todo-filtr';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule, TodoEdit, TodoFiltr],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  newTitle = '';
  newPriority: TodoPriority = 'medium';
  editingTodo: Todo | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.loadTodos().subscribe((todos) => {
      this.todos = this.todoService.sortByPriority(todos);
      this.filteredTodos = this.todos;
    });
  }

  addTodo(): void {
    const trimmedTitle = this.newTitle.trim();

    if (!trimmedTitle) return;

    const updatedTodos = this.todoService.addTodo(trimmedTitle, this.newPriority);
    this.todos = this.todoService.sortByPriority(updatedTodos);
    this.filteredTodos = this.todos;

    this.newTitle = '';
    this.newPriority = 'medium';
  }

  deleteTodo(id: number): void {
    const updatedTodos = this.todoService.deleteTodo(id);
    this.todos = this.todoService.sortByPriority(updatedTodos);
    this.filteredTodos = this.todos;
  }

  toggleCompleted(id: number): void {
    const updatedTodos = this.todoService.toggleCompleted(id);
    this.todos = this.todoService.sortByPriority(updatedTodos);
    this.filteredTodos = this.todos;
  }

  changePriority(todo: Todo, priority: TodoPriority): void {
    const updatedTodo: Todo = {
      ...todo,
      priority,
    };

    const updatedTodos = this.todoService.updateTodo(updatedTodo);
    this.todos = this.todoService.sortByPriority(updatedTodos);
    this.filteredTodos = this.todos;
  }

  editTodo(todo: Todo): void {
    this.editingTodo = { ...todo };
  }

  closeEditModal(): void {
    this.editingTodo = null;
  }

  saveTodoChanges(updatedValues: { title: string; description: string }): void {
    if (!this.editingTodo) return;

    const trimmedTitle = updatedValues.title.trim();

    if (!trimmedTitle) return;

    const updatedTodo: Todo = {
      ...this.editingTodo,
      title: trimmedTitle,
      description: updatedValues.description.trim(),
    };

    const updatedTodos = this.todoService.updateTodo(updatedTodo);
    this.todos = this.todoService.sortByPriority(updatedTodos);
    this.filteredTodos = this.todos;
    this.closeEditModal();
  }

  updateFilteredTodos(todos: Todo[]): void {
    this.filteredTodos = todos;
  }
}
