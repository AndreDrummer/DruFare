import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
// import { FareMainComponent } from './fare/fare-main/fare-main.component';
// import { FareFormComponent } from './fare/fare-form/fare-form.component';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent }
  // { path: 'fares', component: FareMainComponent },
  // { path: 'form', component: FareFormComponent }
];

