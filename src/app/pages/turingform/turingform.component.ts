import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../shared/components/dynamicform/dynamicform.component';
import { DynamicheaderComponent } from "../../shared/components/dynamicheader/dynamicheader.component";

@Component({
  selector: 'app-turingform',
  standalone: true,
  imports: [DynamicFormComponent, DynamicheaderComponent], // Añade el otro componente a los imports
  templateUrl: './turingform.component.html',
  styleUrls: ['./turingform.component.scss'] // Corrige el nombre de la propiedad a styleUrls
})
export default class TuringformComponent {

  submit = (event:any) =>{
    let form = JSON.stringify(event);
    console.dir(form);
  }
}
