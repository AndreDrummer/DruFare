import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  title = `Voceê ainda nao fez nenhum gasto!\nClique em '+' para começar anotar`;
  constructor() { }
}
