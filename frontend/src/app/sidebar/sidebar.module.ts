import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar.component';
import { SidebarRoutingModule } from './sidebar.routing';
import { GastosMenuComponent } from './gastos/gastos-menu.component';

@NgModule({
    imports: [
        BrowserModule,
        SidebarRoutingModule
    ],
    declarations: [
        SidebarComponent,
        GastosMenuComponent
    ],
    exports: [
        SidebarComponent
    ]
})
export class SidebarModule { }