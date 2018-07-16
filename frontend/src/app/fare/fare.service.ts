import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Fare } from './fare.model';
import { FareRoutingModule } from './fare.routing.module';
import { URL } from './base-url';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FareService {

  constructor(private http: HttpClient) { }

  find(tipo?: string): Observable<Fare[]> {
    let params: HttpParams;
    if (tipo) {
      params = new HttpParams().append('paymentForm', tipo);
    }
    return this.http.get<Fare[]>(`${URL}`, {params});
  }

  findById(fareId: string): Observable<Fare> {
    return this.http.get<Fare>(`${URL}/${fareId}`);
  }

  create(gasto: Fare): Observable<Fare> {
    return this.http.post<Fare>(`${URL}`, gasto);
  }

  update(fareId: string, gasto: Fare): Observable<Fare> {
   return this.http.patch<Fare>(`${URL}/${fareId}`, gasto);
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
