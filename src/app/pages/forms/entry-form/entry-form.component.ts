import { Component } from '@angular/core';
import { DynamicheaderComponent } from "../../../shared/components/dynamicheader/dynamicheader.component";
import { DynamicFormComponent } from "../../../shared/components/dynamicform/dynamicform.component";

@Component({
  selector: 'app-entry-form',
  standalone: true,
  imports: [DynamicheaderComponent, DynamicFormComponent],
  templateUrl: './entry-form.component.html',
  styleUrl: './entry-form.component.scss'
})
export class EntryFormComponent {
submit($event: any) {
throw new Error('Method not implemented.');
}

}
