import { Component, OnInit } from '@angular/core';

import { NovoService } from '../novo/novo.service';
import { Gastos } from './gastos/gastos.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  lastYear: Gastos
  menuGastos = ['2018', '2019']

  constructor(private novoService: NovoService) { }

  ngOnInit() {
    this.novoService.find().subscribe(res => {
      const lastSpent = res.pop();
      // this.lastYear = lastSpent.ano;
      res.forEach(item => {
        // let ano = item.ano;
        // let itemArray;
        // for (itemArray in this.menuGastos) {
        //   if (itemArray === ano) {
        //     const obj = { ano }
        //     this.menuGastos.push(obj);
        //   }
        // }
      })
    })
  }
}
