import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FareMainComponent } from './fare-main/fare-main.component';
import { FareFormComponent } from './fare-form/fare-form.component';

export const fareRoutes: Routes = [
  { path: 'fares', component: FareMainComponent },
  { path: 'form', component: FareFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(fareRoutes)],
  exports: [RouterModule]
})
export class FareRoutingModule { }
