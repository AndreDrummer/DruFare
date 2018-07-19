import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FareMainComponent } from './fare-main/fare-main.component';
import { FareFormComponent } from './fare-form/fare-form.component';
import { FareRoutingModule } from './fare.routing.module';
import { ResumeComponent } from './fare-main/resume/resume.component';

// Devextreme Import
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxValidationSummaryModule } from 'devextreme-angular/ui/validation-summary';

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
    DxValidatorModule,
    DxValidationSummaryModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FareFormComponent,
    FareMainComponent,
    ResumeComponent
  ],
  exports: [
    FareFormComponent,
    FareMainComponent,
    ResumeComponent,
    ReactiveFormsModule
  ]
})
export class FareModule { }
