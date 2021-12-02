import { Component, OnInit } from '@angular/core';

import { ApiService } from './api.service';
import { TodoList } from './api.interface';

@Component({
  selector: 'app-root',
  template: `
  <div style="text-align:center">
    <h1>
      Lista de Tarefas
    </h1>
  </div>
  <ul>
    <li *ngFor="let item of items">
      <h2>{{ item.name }}</h2>
    </li>
  </ul>
  {{ error?.message }}
  `
})
export class AppComponent implements OnInit {

  items: TodoList[];
  error: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getTodoList().subscribe(
      (items: TodoList[]) => this.items = items,
      (error: any) => this.error = error
    );
  }
}
