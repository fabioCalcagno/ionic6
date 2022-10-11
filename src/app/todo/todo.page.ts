import { MenuService } from './../menu/service/menu.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TodoService } from './service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  constructor(private alertCtrl:AlertController, 
    private todoService:TodoService,
    private menuService:MenuService) {
      
      this.menuService.actualMenuListener.next({color:"secondary", tituloTela:"Lista de tarefas", menuColor:"tertiary"});
    }

  ngOnInit() {
    
  }

  async showAdd(){
    const inputId = Math.random().toString();
    this.alertCtrl.create({
      cssClass:'my-custom-alert-center-buttons',
      header:'Criar tarefa',
      inputs:[
        {
          name:'tarefa',
          type:'text',
          id:inputId,
          placeholder:'Descreva sua tarefa',
        }
      ],
      buttons:[
        {
          text: 'Cancelar',
          role:'cancel',
          cssClass:'cancel-task',
          id:"cancelTask"
        },
        {
          text:'Adicionar',
          handler:(value)=>{
            
            if(!value.tarefa){
              document.getElementById(inputId).parentElement.appendChild(this.invalidField());
              return false;
            }else{
              this.todoService.addItem(value.tarefa);
            }
            
          }
        }
      ]
    }).then((alert)=>{
      alert.present();
      setTimeout(() => {
        document.getElementById(alert.inputs[0].id).focus()
      }, 100);
    });    
  }

  private invalidField(text?:string){
    let span = document.createElement('span');
    span.setAttribute("class","invalid");

    span.innerText = text || "Campo obrigatório";
    return span
  }

}
