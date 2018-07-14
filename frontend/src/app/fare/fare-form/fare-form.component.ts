import { Component, OnInit } from '@angular/core';

import { FareService } from './../fare.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

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
      this._fareId = this.route.snapshot.params.id;
    }
    return this._fareId;
  }

  private isEditing(): boolean {
    return this.fareId ? true : false;
  }

  constructor(
    private fareService: FareService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  cancelButton() {
    window.alert('Boa escolha soldado!\nMas espero que não tenha gastado memo ein..,');
  }

  ngOnInit () {
    this.fareForm = this.fb.group({
      name: this.fb.control(''),
      date: this.fb.control(''),
      value: this.fb.control(''),
      paymentForm: this.fb.control('')
    });

    if (this.isEditing()) {
      const response = this.fareService.gastos[0];
      this.gastos = response;
      this.fareForm.patchValue(this.gastos);
      this.fareForm.patchValue({date:  moment(response.date).format('YYYYMMDD')});
    }
  }

  onRegister() {
    window.alert('É uma pena... meu bolso dói!');
    const gasto = this.fareForm.value;
    this.fareService.create(gasto);
  }
}
