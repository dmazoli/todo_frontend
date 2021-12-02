import { Component, OnInit } from '@angular/core';

import { ApiService } from './api.service';
import { TodoList } from './api.interface';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  todos: Array<any> = []
  baseUrl: string = "http://localhost:8000/todos"
  
  //Properties to Bind with Create Form
  createNome: string = ""
  createInicio: string = ""
  createFim: string = ""
  createStatus: boolean = false

  //Properties to Bind with Create Form
	editNome: string = ""
  editInicio: string = ""
  editFim: string = ""
  editStatus: boolean = false
  editId: number = 0


	//Function to Grab list of todos
  async getTodos() {
    const response = await fetch(this.baseUrl)
    const data = await response.json()
    this.todos = await data
  }
  
  //takes data from form and creates new todo
  async createTodo() {
    console.log(this.createNome, this.createInicio, this.createFim, this.createStatus)
    await fetch(this.baseUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: this.createNome,
        inicio: this.createInicio,
        fim: this.createFim,
        status: this.createStatus,
      }),
    })
    //update todo list and reset form
    this.getTodos()
    this.createNome= ""
    this.createInicio = ""
    this.createFim = ""
    this.createStatus = false
  }
  
  //takes data from form and updates new todo
  async updateTodo() {
    await fetch(this.baseUrl + "/" + this.editId, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: this.editNome,
        inicio: this.editInicio,
        fim: this.editFim,
        status: this.editStatus,
      }),
    })
    //update todo list and reset form
    this.getTodos()
    this.editNome = ""
    this.editInicio = ""
    this.editFim = ""
    this.editStatus = false
    this.editId = 0
  }
  async deleteTodo(todo: any) {
    await fetch(this.baseUrl + "/" + todo.id, {
      method: "delete",
    })
    //update list of todos
    this.getTodos()
  }
  ngOnInit() {
    this.getTodos()
  }
}
