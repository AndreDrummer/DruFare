import { Component, Input } from '@angular/core';
import { Dashboard } from './dashboard.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gastos',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  ano: string;
  mes: string;

  @Input() dashboard: Dashboard;

  constructor(private router: Router) { }

  spentDetail() {
    this.ano = this.dashboard.ano;
    this.mes = this.dashboard.mes;
    this.router.navigate(['/fares'], {queryParams: {ano: this.ano, mes: this.mes}})
  }  
}
