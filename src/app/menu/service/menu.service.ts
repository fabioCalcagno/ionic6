import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TelaModel } from '../menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  actualMenuListener = new Subject<TelaModel>()

  constructor() { }
}
