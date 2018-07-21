import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Fare } from './fare.model';
import { Novo } from '../novo/novo.model';
import { URL } from './base-url';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FareService {

  constructor(private http: HttpClient) { }

  find(): Observable<Novo[]> {
    return this.http.get<Novo[]>(`${URL}`);
  }

  findById(fareId: string): Observable<Novo> {
    return this.http.get<Novo>(`${URL}/${fareId}`);
  }

  update(fareId: string, gasto: Novo): Observable<Novo> {
    console.log(gasto);
   return this.http.put<Novo>(`${URL}/${fareId}`, gasto);
  }

  /*
    Eu preciso criar os métodos de atualizar e deletar gasto .
  */

  findPay(payment?: string): Observable<Fare[]> {
    let params: HttpParams;
    if (payment) {
      params = new HttpParams().append('paymentForm', payment);
    }
    return this.http.get<Fare[]>(`${URL}`, {params});
  }

  create(gastoId: string, gasto: Fare[]): Observable<Novo> {
    console.log(gasto);
    return this.http.put<Novo>(`${URL}/${gastoId}`, gasto);
  }

  delete(fareId: string): Observable<any> {
    return this.http.delete<any>(`${URL}/${fareId}`);
  }
}
  // update(fareId: string, gasto: Fare): any {
  //   Object.keys(gasto).forEach(item => {
  //     this.gastos[0][item] = gasto[item];
  //   });
  //   return this.gastos[0];
  // }
