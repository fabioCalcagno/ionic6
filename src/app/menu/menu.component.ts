import { MenuService } from './service/menu.service';
import { Component, OnInit } from '@angular/core';
import { TelaModel } from './menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  protected menuActualScreen:TelaModel;

  constructor(private menuService:MenuService) {
    this.menuService.actualMenuListener.subscribe({
      next:(actualScreenObject)=>{
        this.menuActualScreen=actualScreenObject
      }
    })
  }

  ngOnInit() {}

}
