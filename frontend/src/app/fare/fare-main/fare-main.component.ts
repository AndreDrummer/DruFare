import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Fare } from './../fare.model';
import { FareService } from './../fare.service';
import * as moment from 'moment';

@Component({
  selector: 'app-fare',
  templateUrl: './fare-main.component.html'
})
export class FareMainComponent implements OnInit {

  gastos: Fare[];

  constructor (
    private fareService: FareService,
    private router: Router
  ) { }

  Novo() {
   this.router.navigate(['/form']);
  }

  ngOnInit() {
    this.fareService.find().subscribe(response => {
      this.gastos = response;
    });
  }

  dateFormat(dateNumber: number): String {
    return moment(dateNumber, 'YYYYMMDD').locale('pt-br').format('L');
  }

  create(event): void {
    this.fareService.create(event.data).subscribe();
  }

  update(event): void {
    console.log(event.data);
    this.fareService.update(event.data._id, event.data).subscribe();
  }

  delete(event): void {
    this.fareService.delete(event.data._id).subscribe();
  }
}
