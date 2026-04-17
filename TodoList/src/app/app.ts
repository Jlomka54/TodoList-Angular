import { Component, signal } from '@angular/core';
import { TodoList } from './component/todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('TodoList');
}
