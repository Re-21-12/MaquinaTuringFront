import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamicheader',
  standalone: true,
  imports: [],
  templateUrl: './dynamicheader.component.html',
  styleUrl: './dynamicheader.component.scss'
})
export class DynamicheaderComponent {
@Input() titulo!: string;
@Input() subtitulo!: string;
}
