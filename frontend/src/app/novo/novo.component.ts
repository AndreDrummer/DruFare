import { Component, OnInit, OnChanges } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { month, year } from 'src/assets/arrays/datasource';
import { NovoService } from './novo.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent implements OnInit, OnChanges {
  meses = month; // Array de meses
  anos = year;  // Array de anos

  mes: string;
  ano: string;

  existe: boolean;

  resposta: any;
  novoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private novoService: NovoService
  ) { }

  ngOnInit() {
    this.novoForm = this.fb.group({
      mes: this.fb.control('', [Validators.required]),
      ano: this.fb.control('',  [Validators.required]),
    });
  }

  ngOnChanges(changes: any) {
    console.log(`ngOnChanges - data is ${this.existe}`);
  }


  testeNovo() {
    this.novoService.find().subscribe(res => console.log(res));
  }

  // Função que verifica se ciclo já foi criado!
  verify() {
    if (this.novoForm.valid) {
      const novo = this.novoForm.value;
      this.mes = novo.mes;
      this.ano = novo.ano;

      this.novoService.findOne(this.mes, this.ano).subscribe(res => {
          if (res.length === 0) {
            this.novoService.newCycle(this.novoForm);
          } else if (res.length > 0) {
              swal({
                title: 'Você Já cadastrou isso!',
                buttons: {
                  cancel: { text: 'Cancelar.', visible: true },
                  confirm: { text: 'Ir para ciclo já existente'}    },
              }).then(Go => {
                if (Go) {
                  this.router.navigate(['/fares'], { queryParams: {ano: this.ano, mes: this.mes}});
                }
              });
            } else {
          }
      });
    } else {
      notify({
        width: '300',
        message: 'Você deve preencher todos os campos!',
        position: {
          my: 'center center',
          at: 'center center'
        }
      }, 'error', 3000);
    }
  }
}
