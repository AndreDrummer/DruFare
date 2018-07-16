import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Fare, Resume } from './../fare.model';
import { FareService } from './../fare.service';
import * as moment from 'moment';

@Component({
  selector: 'app-fare',
  templateUrl: './fare-main.component.html'
})
export class FareMainComponent implements OnInit {

  gastos: Fare[];

  cardValue = 0;
  moneyValue = 0;
  totalValue = 0;

  resumes: Resume[] = [
    {
      name: 'Cartão',
      value: 0,
      color: 'red'
    },
    {
      name: 'Dinheiro',
      value: 0,
      color: 'yellow'
    }
  ];

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

    this.fareService.find().subscribe(response => {
      response.filter(item => {
        if (item.paymentForm === 'Cartão') {
          this.cardValue += item.value;
        } else if (item.paymentForm === 'Dinheiro') {
          this.moneyValue += item.value;
        }
        this.totalValue += item.value;
      });
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
