import { Component } from '@angular/core';
import { DynamicheaderComponent } from "../../../shared/components/dynamicheader/dynamicheader.component";
import { DynamicFormComponent } from "../../../shared/components/dynamicform/dynamicform.component";

@Component({
  selector: 'app-alphabet-form',
  standalone: true,
  imports: [DynamicheaderComponent, DynamicFormComponent],
  templateUrl: './alphabet-form.component.html',
  styleUrl: './alphabet-form.component.scss'
})
export class AlphabetFormComponent {
submit($event: any) {
throw new Error('Method not implemented.');
}

}
