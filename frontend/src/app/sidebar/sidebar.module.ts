import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar.component';
import { SidebarRoutingModule } from './sidebar.routing';

@NgModule({
    imports: [
        BrowserModule,
        SidebarRoutingModule
    ],
    declarations: [
        SidebarComponent        
    ],
    exports: [
        SidebarComponent
    ]
})
export class SidebarModule { }