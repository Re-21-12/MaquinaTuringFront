import { Component, Input } from '@angular/core';
import { TuringMachine } from '../../Models/turingMachineModels';

@Component({
  selector: 'app-dynamictable',
  standalone: true,
  imports: [],
  templateUrl: './dynamictable.component.html',
  styleUrl: './dynamictable.component.scss'
})
export class DynamictableComponent {
@Input() dataTable!:TuringMachine[] ;
@Input() link!:string;
}



