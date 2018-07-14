import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FareMainComponent } from './fare-main/fare-main.component';
import { FareFormComponent } from './fare-form/fare-form.component';
import { FareRoutingModule } from './fare.routing.module';
import { FareService } from './fare.service';

// Devextreme Import
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    BrowserModule,
    DxDateBoxModule,
    FareRoutingModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxDataGridModule,
    DxButtonModule,
    ReactiveFormsModule,    
  ],
  declarations: [
    FareFormComponent,
    FareMainComponent
  ],
  exports: [
    FareFormComponent,
    FareMainComponent,
    ReactiveFormsModule
  ]
})
export class FareModule { }
