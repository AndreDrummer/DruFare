import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';

@NgModule({
    imports:[        
        BrowserModule,
        HomeRoutingModule
    ],
    declarations: [
        DashboardComponent,
        HomeComponent
    ],
    exports: [
        DashboardComponent,
        HomeComponent
    ]
})
export class HomeModule { }