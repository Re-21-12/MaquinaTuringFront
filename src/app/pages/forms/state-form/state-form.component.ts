import { Component } from '@angular/core';
import { DynamicheaderComponent } from "../../../shared/components/dynamicheader/dynamicheader.component";
import { DynamicFormComponent } from "../../../shared/components/dynamicform/dynamicform.component";

@Component({
  selector: 'app-state-form',
  standalone: true,
  imports: [DynamicheaderComponent, DynamicFormComponent],
  templateUrl: './state-form.component.html',
  styleUrl: './state-form.component.scss'
})
export class StateFormComponent {
submit($event: any) {
throw new Error('Method not implemented.');
}

}
