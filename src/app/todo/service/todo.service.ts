import { TodoModel } from './../model/todo-model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private key:string="tarefas";
  listaSubject = new Subject<Array<TodoModel>>();

  get getTaskList():Array<TodoModel> | null{
    return JSON.parse(localStorage.getItem(this.key));
  }

  addItem(item:string):boolean{
    const todoItem:TodoModel = {tarefa:item, dataCriacao: new Date()};
    const jaExisteTarefa = this.getTaskList.some(localStorageItem => localStorageItem.tarefa==todoItem.tarefa);
    
    if(!jaExisteTarefa && item){
      this.salvarNoStorage(todoItem);
      this.listaSubject.next(this.getTaskList);
      return true;
    }

    return false;
  }

  deleteTask(item:TodoModel){    
    const filteredList = this.getTaskList.filter(value => {return value.dataCriacao!==item.dataCriacao && value.tarefa !== item.tarefa });
    localStorage.setItem(this.key, JSON.stringify(filteredList));
    this.listaSubject.next(this.getTaskList);
  }

  private salvarNoStorage(item:TodoModel){
    const localStorageList= this.getTaskList;
    localStorageList.push(item);
    localStorage.setItem(this.key, JSON.stringify(localStorageList));
  }
}
