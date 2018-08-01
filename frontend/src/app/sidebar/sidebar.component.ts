import { Component, OnInit } from '@angular/core';

import { NovoService } from '../novo/novo.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit {

  menuGastos = [];
  yearParams: string;

  constructor(
    private novoService: NovoService
  ) { }

  ngOnInit() {
    this.novoService.find().subscribe(res => {
      if (res.length > 0) {
        const lastSpent = res.pop();
        this.insertInto(this.menuGastos, lastSpent.ano);
      }
      res.forEach(item => {
        let ano = item.ano;
        this.insertInto(this.menuGastos, ano);
      })
    })
  }

  changeYear() {
    window.location.reload();
  }

  insertInto(array, element) {
    if (!array.includes(element)) {
      array.push(element);
    }
  }
}
