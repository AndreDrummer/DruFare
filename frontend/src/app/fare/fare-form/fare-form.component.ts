import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';
import swal from 'sweetalert';
import notify from 'devextreme/ui/notify';

import { FareService } from './../fare.service';
import { Novo } from './../../novo/novo.model';
import { Fare } from './../fare.model';

@Component({
  selector: 'app-fare-form',
  templateUrl: './fare-form.component.html'
})
export class FareFormComponent implements OnInit {

  gastos: any;
  _idEx: string;
  fareForm: FormGroup;
  ano: string;
  mes: string;
  _idIn: string;
  textButton: string = 'Registrar';

  // idEx é o id do elemento Mes/Ano o id Externo;
  get idEx(): string {
    if (!this._idEx) {
      this._idEx = this.route.snapshot.queryParams.idEx;
    }
    return this._idEx;
  }

  // idIn é o id interno do array de gastos;
  get idIn(): string {
    if (!this._idIn) {
      this._idIn = this.route.snapshot.queryParams.idIn;
    }
    return this._idIn;
  }

  private isEditing(): boolean {
    return this.idIn ? true : false;
  }

  constructor(
    private fareService: FareService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit () {
    this.mes = this.route.snapshot.queryParams.mes;
    this.ano = this.route.snapshot.queryParams.ano;

    this.fareForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      date: this.fb.control('', [Validators.required]),
      value: this.fb.control('', [Validators.required]),
      paymentForm: this.fb.control('', [Validators.required])
    });

    if (this.isEditing()) {
      this.textButton = 'Atualizar'
      this.fareService.findById(this.idEx).subscribe(response => {
        this.ano = response.ano;
        this.mes = response.mes;
        const fares = response.fare;
        fares.forEach(item => {
          const dado = item._id;
          if (dado === this.idIn) {
            this.fareForm.patchValue(item);
            this.fareForm.patchValue({date:  moment(item.date, 'YYYYMMDD')});
          }
        });
      });
    }
  }

  onRegister() {
    if (this.fareForm.valid) {
      swal({
        title: `${this.isEditing() ? 'Atualizar' : 'Registrar'} gasto?`,
        icon: 'warning',
        buttons: {
          cancel: { text: 'Espere', visible: true},
          confirm: { text: `Pode ${this.isEditing() ? 'Atualizar' : 'Registrar'}`},
        },
        dangerMode: true
      }).then(willSave => {
        return new Promise(resolve => {
          if (willSave) {
            const fare = this.fareForm.value;

            fare.date = moment(fare.date).format('YYYYMMDD');

            if (this.isEditing()) {
              // Atualizando um gasto no ciclo. Ver .README
              this.fareService.findById(this.idEx).subscribe(response => {
                const dados: Novo = response;
                dados.fare.forEach((item, index) => {
                  if (item._id === this.idIn) {
                    Object.keys(fare).forEach(gasto => {
                      dados.fare[index][gasto] = fare[gasto];
                    });
                  }
                });
                return this.fareService.update(this.idEx, dados).subscribe(resp => resolve(resp));
              });
            } else {
              // Inserindo um novo gasto no ciclo. Ver .README
              this.fareService.findById(this.idEx).subscribe(response => {
              const dados: Novo = response;
              dados.fare.push(fare);
              return this.fareService.update(this.idEx, dados).subscribe(resp => resolve(resp));
              });
            }
          } else {
            resolve();
          }
        });
        }).then((fare: Fare) => {
          if (fare) {
            this.router.navigate(['/fares'], { queryParams: {ano: this.ano, mes: this.mes}});
            swal(`Gasto ${this.isEditing() ? 'atualizado' : 'registrado'} com sucesso!`, {icon: 'success'});
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
