import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../model/todo-model';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  listItem:Array<TodoModel>=[];

  constructor(private todoService:TodoService, 
              private alertCtrl:AlertController) { }

  ngOnInit() {
    this.listItem = this.todoService.getTaskList;
    this.todoService.listaSubject.subscribe({
      next: (value)=>{
        console.log(value)
        this.listItem=value;
      }
    })
  }

  deleteTask(item:TodoModel){
    this.alertCtrl.create({
      cssClass:'my-custom-alert-center-buttons',
      header:"Tarefas",
      subHeader: "Tem certeza que deseja excluir esta tarefa?",
      buttons:[
        {
          text: 'Cancelar',
          role:'cancel',
          cssClass:'cancel-task',
          id:"cancelTask"
        },
        {
          text:'Sim',
          handler:()=>{
            this.todoService.deleteTask(item);            
          }
        }
      ]
    }).then((alert)=>{
      alert.present()
    })

  }



}
