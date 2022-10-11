import { MenuService } from './../menu/service/menu.service';
import { Component } from '@angular/core';
import { SearchbarCustomEvent, ToastController } from '@ionic/angular';

import { CorreioService } from './services/correio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(protected correioService:CorreioService,
    private menuService:MenuService,
    private toastController: ToastController) {
      this.menuService.actualMenuListener.next({color:"primary", tituloTela:"Minhas encomendas", menuColor:"tertiary"});
    }

  protected loading:boolean=false;
  encomendaTracking:any;

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Ocorreu um erro na busca do objeto.',
      duration: 3500,
      icon: 'alert-circle',
      animated:true,
      color:'secondary'
    });

    await toast.present();
  }

  buscarEncomenda(event:any){
    this.loading=true;
    this.correioService.buscarObjeto(event.detail.value)
      .then((value:any)=>{
        this.encomendaTracking = value?.objetos[0].eventos
      })
      .catch(async(error)=> {
        console.log(error)
        this.encomendaTracking=[];
        await this.presentToast();
      })
      .finally(()=>{
        this.loading=false;
      })

  }

}
