import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { ComponentsModule } from 'src/app/components/components.module'

@NgModule({
    imports:[        
        BrowserModule,
        HomeRoutingModule,
        ComponentsModule
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