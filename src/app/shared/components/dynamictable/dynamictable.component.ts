import { Component, inject, Input } from '@angular/core';
import { TuringMachine } from '../../Models/turingMachineModels';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dynamictable',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './dynamictable.component.html',
  styleUrl: './dynamictable.component.scss'
})
export class DynamictableComponent {
  private readonly router = inject(Router)
@Input() dataTable!:TuringMachine[] ;
@Input() link!:string;

navigate(id:any){
  this.router.navigate([`execute/${id}`])
}
}



