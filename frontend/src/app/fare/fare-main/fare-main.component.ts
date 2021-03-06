import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Fare } from './../fare.model';
import { Novo } from './../../novo/novo.model';
import { Resume } from './resume/resume.model';

import { NovoService } from './../../novo/novo.service';
import { FareService } from './../fare.service';

import * as moment from 'moment';
import notify from 'devextreme/ui/notify';
import { month, year } from 'src/assets/arrays/datasource';

@Component({
  selector: 'app-fare',
  templateUrl: './fare-main.component.html'
})
export class FareMainComponent implements OnInit {
  gastos: Fare[];

  mesU: string;
  anoU: string;

  title: string;
  idEx: string;

  searchForm: FormGroup;

  mesSearch = month;
  anoSearch = year;

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
    this.mesU = mes
    this.anoU = ano;
    this.title = `${this.mesU} de ${this.anoU}`;
    return mes && ano ? true : false;
  }

  constructor(
    private fareService: FareService,
    private novoService: NovoService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.params();
    this.startPage();

    this.searchForm = this.fb.group({
      mes: this.fb.control('', [Validators.required]),
      ano: this.fb.control('')
    });
  }

  startPage() {    
    this.novoService.findOne(this.anoU, this.mesU).subscribe(response => {    
      response.forEach(item => {        
        this.idEx = item._id;
        if (this.mesU === undefined){}
        else {
        item.fare.forEach(spent => {
          if (spent.paymentForm === 'Cartão') {
            this.cardValue += spent.value;
          } else if (spent.paymentForm === 'Dinheiro') {
            this.moneyValue += spent.value;
          }
          this.totalValue += spent.value;        
          this.gastos = item.fare;
        })
      }
    })
  })
}

  search() {
    if (this.searchForm.valid) {
      const search = this.searchForm.value;      
      const mes = search.mes;
      let ano = search.ano;
      if (!ano){
        ano = this.anoU;
      }
      this.novoService.findOne(ano, mes).subscribe(res => {
        if (res.length === 0) {
          swal({
            title: 'Não encontrado!',
            buttons: {
              cancel: { text: 'Fechar', visible: true},
              confirm: { text: 'Começar esse mês'},
            },
            icon: 'warning',
            dangerMode: true
          }).then(willCreate => {
            return new Promise (resolve => {
              if (willCreate) {                
                this.novoService.newCycle(this.searchForm, ano);
              }  else {
                resolve();
              }
            });             
          });
        } else {           
          this.router.navigate(['/fares'], { queryParams: { ano, mes } });
          window.location.reload();          
        }                   
      });                                                  
    } else {
      notify({
        width: '300',
        message: 'Selecione um mês!',
        position: {
          my: 'center center',
          at: 'center center'
        }
      },
      'error',
      3000
    );
  }
}

  NovoGasto() {
    if (this.params()) {
      this.router.navigate(['/form'], {
        queryParams: { ano: this.anoU, mes: this.mesU, idEx: this.idEx }
      });
    } else {
      notify(
        {
          width: '500',
          message:
            'Você deve voltar à Página Inicial e começar um ciclo para registrar seus gastos!',
          position: {
            my: 'center center',
            at: 'center center'
          }
        },
        'error',
        7000
      );
    }
  }

  dateFormat(dateNumber: number): String {
    return moment(dateNumber, 'YYYYMMDD')
      .locale('pt-br')
      .format('L');
  }

  create(event): void {
    this.fareService.create(event.data._id, event.data).subscribe();
  }

  update(event): void {    
    this.fareService.update(event.data._id, event.data).subscribe();
  }

  // Função que remove um gasto utilizando o método remove(array, id) e o findById(id) do service;
  delete(event): void {
    const id = event.data._id;
    this.fareService.findById(this.idEx).subscribe(response => {
      const dado: Novo = response;
      this.fareService.remove(dado.fare, id);
      this.fareService.update(this.idEx, dado).subscribe();
    });
  }
}
