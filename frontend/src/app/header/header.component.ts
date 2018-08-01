import { Component, OnInit } from '@angular/core';
import { NovoService } from '../novo/novo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  ano: string;

  constructor(private novoService: NovoService) { }

  ngOnInit() {
    this.novoService.find().subscribe(res => {
      if (res.length > 0) {
        const lastSpent = res.pop();
        this.ano = lastSpent.ano;
      }
    });
  }
}
