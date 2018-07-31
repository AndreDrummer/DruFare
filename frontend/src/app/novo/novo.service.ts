import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Novo } from './novo.model';
import { URL } from './novo-baseUrl';

@Injectable({
  providedIn: 'root'
})
export class NovoService {

  constructor(private http: HttpClient, private router: Router) { }

    findOne(mes?: string, ano?: string): Observable<Novo[]> {
      let params: HttpParams;
      if (mes !== undefined && ano !== undefined ) {        
        params = new HttpParams().append('mes', mes).append('ano', ano);
      }
      return this.http.get<Novo[]>(`${URL}`, {params});
    }

    find(): Observable<Novo[]> {
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

  // Função que inicia novo ciclo caso não tenha um igual
  newCycle(formR) {
    const form = formR.value;  
    const ano = form.ano;
    const mes = form.mes;
    swal({
      title: 'Iniciar Novo Ciclo de Gastos?',
      buttons: {
        cancel: { text: 'Calma ae.', visible: true },
        confirm: { text: 'Iniciar'}    },
      dangerMode: true
    }).then(willSave => {
      return new Promise (resolve => {
        if (willSave) {
          form.nome = mes+' de '+ano;
          this.create(form).subscribe(res => resolve(res));          
        } else {
          resolve();
        }
      }).then((novo: any) => {
        if (novo) {
          this.router.navigate(['/fares'], { queryParams: {ano: ano, mes: mes}});
          swal('Ciclo Iniciado!', {icon: 'success'});
        }
      });
    });    
  }
}


