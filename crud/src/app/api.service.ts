import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class ApiService {

  private apiRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getTodoList() {
    return this.http.get(this.apiRoot.concat('todo-list/'));
  }

  createTodo(nome: string, inicio: number, fim: number, status: boolean) {
    return this.http.post(
      this.apiRoot.concat('todo-list/'),
      { nome, inicio, fim,  status}
    );
  }

  deleteTodo(id: number) {
    return this.http.delete(this.apiRoot.concat('todo-list/$[id]/'));
  }
}