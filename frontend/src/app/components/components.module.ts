import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BotaoPlusComponent } from './botao/botao.component';

@NgModule({
    imports: [
        BrowserModule,
    ],
    declarations: [
        BotaoPlusComponent
    ],
    exports: [
        BotaoPlusComponent
    ]
})
export class ComponentsModule { }