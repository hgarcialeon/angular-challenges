import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    @if (loading) {
      <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
    } @else {
      <div *ngFor="let todo of todos()">
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo.id)">Delete</button>
      </div>
    }
  `,
})
export class TodoListComponent implements OnInit {
  todos: WritableSignal<Todo[]> = signal<Todo[]>([]);
  loading = true;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos.set(todos);
      this.loading = false;
    });
  }

  update(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe((todoUpdated: Todo) => {
      this.todos.update((todos) =>
        todos.map((todo) => (todo.id === todoUpdated.id ? todoUpdated : todo)),
      );
    });
  }

  delete(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
    });
  }
}
