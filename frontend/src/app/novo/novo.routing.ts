import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovoComponent } from './novo.component';

export const novoROUTES: Routes = [
  { path: 'novo', component: NovoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(novoROUTES)],
  exports: [RouterModule]
})
export class NovoRoutingModule { }
