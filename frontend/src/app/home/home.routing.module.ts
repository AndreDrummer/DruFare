import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const homeRoutes = [
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }