import { FareRoutingModule } from './fare.routing.module';
import { Injectable } from '@angular/core';

import { Fare } from './fare.model';

@Injectable({
  providedIn: 'root'
})
export class FareService {

  formasPagar = ['Cartão de Crédito', 'Dinheiro'];

  gastos = [
    {
      name: 'Lanche Facul',
      date: new Date(2018, 1, 2),
      value: 3.5,
      paymentForm: 'Cartão de Crédito'
    }
  ];

  constructor() { }

  pay(): any {
    return this.formasPagar;
  }

  find(): any {
    return this.gastos;
  }

  findById(fareId: string): any {
    return this.gastos[0];
  }

  create(gasto: any): any {
    return this.gastos.push(gasto);
  }

  update(fareId: string, gasto: any): any {
    Object.keys(gasto).forEach(item => {
      this.gastos[0][item] = gasto[item];
    });
    return this.gastos[0];
  }

  delete(fareId: string): any {
    console.log('Deletei o maluco...');
  }

}
