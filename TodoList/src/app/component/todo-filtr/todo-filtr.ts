import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Todo } from '../../models/todo';

type TodoFilterType = 'all' | 'completed' | 'active';

@Component({
  selector: 'app-todo-filtr',
  imports: [CommonModule],
  templateUrl: './todo-filtr.html',
  styleUrl: './todo-filtr.css',
})
export class TodoFiltr implements OnChanges {
  @Input() todos: Todo[] = [];
  @Output() filteredTodosChange = new EventEmitter<Todo[]>();

  selectedFilter: TodoFilterType = 'all';

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['todos']) return;

    this.emitFilteredTodos();
  }

  setFilter(filter: TodoFilterType): void {
    this.selectedFilter = filter;
    this.emitFilteredTodos();
  }

  private emitFilteredTodos(): void {
    if (this.selectedFilter === 'completed') {
      this.filteredTodosChange.emit(this.todos.filter((todo) => todo.completed));
      return;
    }

    if (this.selectedFilter === 'active') {
      this.filteredTodosChange.emit(this.todos.filter((todo) => !todo.completed));
      return;
    }

    this.filteredTodosChange.emit(this.todos);
  }
}
