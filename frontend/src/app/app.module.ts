import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FareModule } from './fare/fare.module';
import { NovoModule } from './novo/novo.module';
import { HomeModule } from './home/home.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { ROUTES } from './app.routes';

// Devestreme internatinalization
import { locale, loadMessages } from 'devextreme/localization';
import 'devextreme-intl';

// loadMessages(require('../assets/scripts/devextreme.pt-BR.json'));
locale('pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
],
  imports: [
    BrowserModule,
    RouterModule,
    FareModule,
    HomeModule,
    NovoModule,
    SidebarModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
