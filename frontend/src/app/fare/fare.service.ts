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

  // Função também usada para remover um novo gasto no array interno;
  findById(fareId: string): Observable<Novo> {
    return this.http.get<Novo>(`${URL}/${fareId}`);
  }

  // Função também usada para inserir um novo gasto no array interno;
  update(fareId: string, gasto: Novo): Observable<Novo> {
   return this.http.put<Novo>(`${URL}/${fareId}`, gasto);
  }

    // Esse método traz todos os ciclos!
    find(): Observable<Novo[]> {
      return this.http.get<Novo[]>(`${URL}`);
    }

  // Esse método deleta apenas o ciclo!
  delete(fareId: string): Observable<any> {
    return this.http.delete<any>(`${URL}/${fareId}`);
  }

  // Essa função cria apenas o ciclo (Mês/Ano);
  create(gastoId: string, gasto: Fare[]): Observable<Novo> {
    console.log(gasto);
    return this.http.put<Novo>(`${URL}/${gastoId}`, gasto);
  }
  /*
    Eu preciso criar os métodos de atualizar.
  */

    // Função que remove o elemento do array;
  remove (array, idIn) {
    array.forEach((item, index) => {
        const dado = item._id === idIn;
        if (dado) {
          array.splice(index, 1);
        }
    });
  }

  findPay(payment?: string): Observable<Fare[]> {
    let params: HttpParams;
    if (payment) {
      params = new HttpParams().append('paymentForm', payment);
    }
    return this.http.get<Fare[]>(`${URL}`, {params});
  }
}

// atualizar(fareId: string, gasto: Fare): any {
//   Object.keys(gasto).forEach(item => {
//     this.gastos[0][item] = gasto[item];
//   });
//   return this.gastos[0];
// }
