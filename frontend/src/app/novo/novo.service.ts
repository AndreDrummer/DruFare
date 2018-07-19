import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Novo } from './novo.model';
import { URL } from './novo-baseUrl';

@Injectable({
  providedIn: 'root'
})
export class NovoService {

  constructor(private http: HttpClient) { }

    findOne(mes?: string, ano?: string): Observable<Novo[]> {
      let params: HttpParams;
      if (mes && ano ) {
        params = new HttpParams().append('mes', mes).append('ano', ano);
      }
      return this.http.get<Novo[]>(`${URL}`, {params});
    }

    find(mes?: string, ano?: string): Observable<Novo[]> {
      return this.http.get<Novo[]>(`${URL}`);
    }

    findById(novoId: string): Observable<Novo> {
      return this.http.get<Novo>(`${URL}/${novoId}`);
    }

    create(novo: Novo): Observable<Novo> {
      return this.http.post<Novo>(`${URL}`, novo);
    }

    update(novoId: string, novo: Novo): Observable<Novo> {
      return this.http.put<Novo>(`${URL}/${novoId}`, novo);
    }

    delete(novoId: string): Observable<any> {
      return this.http.delete<Novo>(`${URL}/${novoId}`);
    }

}
