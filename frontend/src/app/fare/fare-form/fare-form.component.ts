import { Component, OnInit } from '@angular/core';

import { FareService } from './../fare.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';
import swal from 'sweetalert';

@Component({
  selector: 'app-fare-form',
  templateUrl: './fare-form.component.html'
})
export class FareFormComponent implements OnInit {

  gastos: any;
  _fareId: string;
  fareForm: FormGroup;

  get fareId(): string {
    if (!this._fareId) {
      this._fareId = this.route.snapshot.params._id;
    }
    return this._fareId;
  }

  private isEditing(): boolean {
    return this.fareId ? true : false;
  }

  constructor(
    private fareService: FareService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit () {
    this.fareForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      date: this.fb.control('', [Validators.required]),
      value: this.fb.control('', [Validators.required]),
      paymentForm: this.fb.control('', [Validators.required])
    });

    if (this.isEditing()) {
      this.fareService.findById(this.fareId).subscribe(response => {
        console.log(response);
      this.fareForm.patchValue(response);
      this.fareForm.patchValue({date:  moment(response.date).format('YYYYMMDD')});
      });
    }
  }

  onRegister() {
    if (this.fareForm.valid) {
      swal({
        title: `${this.isEditing() ? 'Atualizar' : 'Salvar'} gasto?`,
        icon: 'warning',
        buttons: {
          cancel: { text: 'Calma aí', visible: true},
          confirm: { text: `Pode ${this.isEditing() ? 'Salvar' : 'Atualizar'}.`},
        },
        dangerMode: true
      }).then(willSave => {
        return new Promise(resolve => {
          if (willSave) {
            const fare = this.fareForm.value;

            fare.date = moment(fare.date).format('YYYYMMDD');
            if (this.isEditing()) {
              this.fareService.update(this.fareId, fare).subscribe(res => resolve(res));
            } else {
              this.fareService.create(fare).subscribe(res => resolve(res));
            }
          } else {
            resolve();
          }
        });
        }).then((fare: any) => {
          if (fare) {
            this.router.navigate(['/fares']);
            swal(`Gasto ${this.isEditing() ? 'atualizado' : 'salvo'} com sucesso!`, {icon: 'success'});
          }
      });
    }
  }
}
