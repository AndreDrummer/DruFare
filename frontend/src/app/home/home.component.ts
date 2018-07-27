import { Component, OnInit } from '@angular/core';
import { NovoService } from '../novo/novo.service';

import { Dashboard } from './dashboard/dashboard.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  title = `Nenhum gasto registrado!`;
  size: any;

  gastos = [];

  constructor(private novoService: NovoService) { }

  ngOnInit(){
    this.startPage();
  }

  startPage() {
    this.novoService.find().subscribe(res => {
      if (res.length > 0) {
        res.forEach(item => {
          const obj = {
            nome: item.nome,
            mes: item.mes,
            ano: item.ano            
          }
          this.gastos.push(obj);
        })
      }
    })
  }
}
