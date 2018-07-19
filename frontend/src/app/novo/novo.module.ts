import { NovoComponent } from './novo.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NovoRoutingModule } from './novo.routing';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxButtonModule } from 'devextreme-angular';
import { DxValidationSummaryModule } from 'devextreme-angular/ui/validation-summary';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NovoRoutingModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxValidationSummaryModule,
    DxValidatorModule
  ],
  exports: [
    NovoComponent
  ],
  declarations: [
    NovoComponent
  ]
})
export class NovoModule { }
