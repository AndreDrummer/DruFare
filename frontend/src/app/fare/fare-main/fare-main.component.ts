import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Fare } from './../fare.model';
import { Novo } from './../../novo/novo.model';
import { Resume } from './resume/resume.model';
import { NovoService } from './../../novo/novo.service';
import { FareService } from './../fare.service';
import * as moment from 'moment';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-fare',
  templateUrl: './fare-main.component.html'
})
export class FareMainComponent implements OnInit {

  gastos: Fare[];
  mes: string;
  ano: string;
  title: string;
  idEx: string;

  cardValue = 0;
  moneyValue = 0;
  totalValue = 0;

  resumes: Resume[] = [
    {
      name: 'Cartão',
      value: 0,
      color: 'red',
      icon: 'cc-visa'
    },
    {
      name: 'Dinheiro',
      value: 0,
      color: 'yellow',
      icon: 'money'
    }
  ];

  private params(): boolean {
    const mes = this.route.snapshot.queryParams.mes;
    const ano = this.route.snapshot.queryParams.ano;
    return mes && ano ? true : false;
  }

  constructor (
    private fareService: FareService,
    private novoService: NovoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

ngOnInit() {
  this.mes = this.route.snapshot.queryParams.mes;
  this.ano = this.route.snapshot.queryParams.ano;
  this.title = `${this.mes} de ${this.ano}`;
  this.startPage();
}

  startPage() {
    this.novoService.find().subscribe(response => {
      response.filter(item => {
        if (item.mes === this.mes && item.ano === this.ano) {
          this.idEx = item._id;
          item.fare.forEach(spent => {
            if (spent.paymentForm === 'Cartão') {
              this.cardValue += spent.value;
            } else if (spent.paymentForm === 'Dinheiro') {
              this.moneyValue += spent.value;
            }
            this.totalValue += spent.value;
            this.gastos = item.fare;
          });
        }
      });
    });
  }

// Removendo um gasto no ciclo. Ver .README
// this.fareService.findById(this.idEx).subscribe(response => {
//   const dados: Novo = response;
//   this.remove(dados.fare, this.idIn);
//   return this.fareService.update(this.idEx, dados).subscribe();
// });

  Novo() {
    if (this.params()) {
      this.router.navigate(['/form'] , { queryParams: {ano: this.ano, mes: this.mes, idEx: this.idEx}});
    } else {
      notify({
        width: '500',
        message: 'Você deve voltar à Página Inicial e começar um ciclo para registrar seus gastos!',
        position: {
          my: 'center center',
          at: 'center center'
        }
      }, 'error', 7000);
    }
   }

  dateFormat(dateNumber: number): String {
    return moment(dateNumber, 'YYYYMMDD').locale('pt-br').format('L');
  }

  create(event): void {
    this.fareService.create(event.data._id, event.data).subscribe();
  }

  update(event): void {
    console.log(event.data);
    this.fareService.update(event.data._id, event.data).subscribe();
  }

  // Função que remove um gasto utilizando o método remove(array, id) e o findById(id) do service;
  delete(event): void {
    const id = event.data._id;
    this.fareService.findById(this.idEx).subscribe(response => {
    const dado: Novo = response;
    this.remove(dado.fare, id);
    this.fareService.update(this.idEx, dado).subscribe();
    });
  }

  // Função que remove o elemento do array;
  remove (array, idIn) {
    array.forEach((item, index) => {
        const dado = item._id === idIn;
        if (dado) {
          array.splice(index, 1);
        }
    });
  }
}
