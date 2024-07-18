import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TodoService, ToDo } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: ToDo[] = [];
  newToDo: ToDo = { toDoId: 0, details: '', isCompleted: false };

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadToDos();
  }

  loadToDos(): void {
    this.todoService.getAllToDos().subscribe((todos) => {
      this.todos = todos;
      this.cdr.detectChanges();
    });
  }

  addToDo(): void {
    this.todoService.saveToDo(this.newToDo).subscribe((todo) => {
      this.newToDo = { toDoId: 0, details: '', isCompleted: false };
    });
    const newToDoCopy = { ...this.newToDo };
    this.todos.push(newToDoCopy);
  }

  updateToDo(updatedTodo: ToDo): void {
    this.todoService.updateToDo(updatedTodo).subscribe(() => {
      const index = this.todos.findIndex(
        (todo) => todo.toDoId === updatedTodo.toDoId
      );
      if (index !== -1) {
        this.todos[index] = updatedTodo;
      }
      this.cdr.detectChanges();
    });
  }

  deleteToDo(id: number): void {
    this.todoService.deleteToDo(id).subscribe(() => {});
    this.todos = this.todos.filter((todo) => todo.toDoId !== id);
  }
}
