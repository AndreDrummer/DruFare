import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { FareModule } from './fare/fare.module';

import { ROUTES } from './app.routes';

// Devestreme internatinalization
import { locale, loadMessages } from 'devextreme/localization';
import 'devextreme-intl';

// loadMessages(require('../assets/scripts/devextreme.pt-BR.json'));
locale('pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent
],
  imports: [
    BrowserModule,
    RouterModule,
    FareModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
