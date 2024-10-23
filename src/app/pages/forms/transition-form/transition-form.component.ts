import { Component } from '@angular/core';
import { DynamicFormComponent } from "../../../shared/components/dynamicform/dynamicform.component";
import { DynamicheaderComponent } from "../../../shared/components/dynamicheader/dynamicheader.component";

@Component({
  selector: 'app-transition-form',
  standalone: true,
  imports: [DynamicFormComponent, DynamicheaderComponent],
  templateUrl: './transition-form.component.html',
  styleUrl: './transition-form.component.scss'
})
export class TransitionFormComponent {
submit($event: any) {
throw new Error('Method not implemented.');
}

}
