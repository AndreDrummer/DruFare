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
        res.forEach((item, index) => {
        let sum = 0;
        let color = '';
        item.fare.forEach(spent => {
          sum += spent.value;          
        })
        if ((index) % 2 === 0) {          
          color = 'yellow'
        } else if ((index) % 3 === 0){          
          color = 'red'
        } else {          
          color = 'green'
        }
        console.log(color);
          const obj = {
            nome: item.nome,
            mes: item.mes,
            ano: item.ano,
            total: sum,
            color: color   
          }
          this.gastos.push(obj);
        })
      }
    })
  }
}
