import { Component, Input } from '@angular/core';
import { Resume } from './resume.model';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
})
export class ResumeComponent {

  @Input() resume: Resume;
  @Input() value: number;

  constructor() { }
}
