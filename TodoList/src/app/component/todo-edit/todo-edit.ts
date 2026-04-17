import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-edit.html',
  styleUrl: './todo-edit.css',
})
export class TodoEdit implements OnChanges {
  @Input({ required: true }) todo!: Todo;
  @Output() save = new EventEmitter<{ title: string; description: string }>();
  @Output() cancel = new EventEmitter<void>();

  title = '';
  description = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['todo'] || !this.todo) return;

    this.title = this.todo.title;
    this.description = this.todo.description ?? '';
  }

  onSave(): void {
    this.save.emit({
      title: this.title,
      description: this.description,
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
