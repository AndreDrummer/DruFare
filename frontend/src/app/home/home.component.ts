import { Component, OnInit, DoCheck } from '@angular/core';
import { NovoService } from '../novo/novo.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, DoCheck {

  title = `Nenhum gasto registrado!`;
  anoTitle = '';
  gastos = [];

  constructor(
    private novoService: NovoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.startPage();
    if (this.getAno()){
      this.anoTitle += 'de '+this.getAno();
    }
  }

  startPage() {
    this.novoService.findYear(this.getAno()).subscribe(res => {
      if (res.length > 0) {
        res.forEach((item, index) => {
          let sum = 0;
          let color = '';
          item.fare.forEach(spent => {
            sum += spent.value;
          })
          if ((index) % 3 === 0) {
            color = 'yellow'
          } else if ((index) % 2 === 0) {
            color = 'red'
          } else {
            color = 'green'
          }
          const obj = {
            _id: item._id,
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

  ngDoCheck() {
    this.getAno();
  }

  getAno(): string {   
    return this.route.snapshot.queryParams.ano;
  }
}
