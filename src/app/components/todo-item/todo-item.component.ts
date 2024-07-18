import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo: ToDo = { toDoId: 0, details: '', isCompleted: false };
  @Output() update = new EventEmitter<ToDo>();
  @Output() delete = new EventEmitter<number>();

  onUpdate(): void {
    this.update.emit(this.todo);
  }

  onDelete(): void {
    this.delete.emit(this.todo.toDoId);
  }
}
