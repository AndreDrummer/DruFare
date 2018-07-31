import { Component, Input } from '@angular/core';
import { Dashboard } from './dashboard.model';
import { Router } from '@angular/router';

import { NovoService } from 'src/app/novo/novo.service';

import swal from 'sweetalert';

@Component({
  selector: 'app-gastos',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  ano: string;
  mes: string;

  @Input() dashboard: Dashboard;

  constructor(
    private router: Router,
    private novoService: NovoService
  ) { }

  spentDetail() {
    this.ano = this.dashboard.ano;
    this.mes = this.dashboard.mes;
    this.router.navigate(['/fares'], { queryParams: { ano: this.ano, mes: this.mes } })
  }

  delete(event) {
    swal({
      title: 'Tem certeza que quer excluir este gasto?',
      buttons: {
        cancel: { text: 'Não', visible: true },
        cnfirm: { text: 'Sim, pode excluir.' }
      },
      dangerMode: true
    }).then(willDelete => {
      return new Promise(resolve => {
        if (willDelete) {
          this.novoService.delete(event._id).subscribe();
          window.location.reload();
        } else {
          resolve();
        }
      });
    }).then(del => {
      if (del) {
        window.location.reload();
      }
    });
  }
}
