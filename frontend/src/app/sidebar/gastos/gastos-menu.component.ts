import { Component, Input} from '@angular/core';
import { Gastos } from './gastos.model';

@Component({
  selector: 'app-gastos-menu',
  templateUrl: './gastos-menu.component.html'
})
export class GastosMenuComponent  {

  constructor () { }

  @Input() gasto: Gastos;

 }
