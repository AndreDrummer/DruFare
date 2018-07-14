import { Component, OnInit } from '@angular/core';

import { FareService } from './../fare.service';

@Component({
  selector: 'app-fare',
  templateUrl: './fare-main.component.html'
})
export class FareMainComponent implements OnInit {

  gastos: any;

  constructor (private fareService: FareService) { }

  adicionar() {
    window.alert('Fazendo gastos ai né vagabundo...\nTem certeza disso?');
  }

  ngOnInit() {
    this.gastos = this.fareService.find();
  }
}
