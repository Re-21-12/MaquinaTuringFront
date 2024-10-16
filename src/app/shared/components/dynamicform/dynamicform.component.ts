import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Forms } from '../../Models/form';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.scss'],
  providers: [FormBuilder],
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  @Input() submit_text!: string;
  @Input() formName!: string;
  @Output() formSubmit = new EventEmitter<any>();
  formConfig: any;

  private fb = inject(FormBuilder);

  ngOnInit() {
    this.formConfig = Forms.find((form) => form.formName === this.formName);
    if (!this.formConfig) {
      this.formConfig = Forms[0];
    }
    this.initializeForm();
  }

  initializeForm() {
    const group: any = {};
  
    this.formConfig.fields.forEach((field: any) => {
      if (field.type === 'checkboxList') {
        const checkboxGroup = this.fb.group({});
        field.checkboxes.forEach((checkbox: any) => {
          const isVacio = checkbox.name === 'vacío';
          checkboxGroup.addControl(checkbox.name, new FormControl({
            value: isVacio, // Marca 'vacío' como true por defecto
            disabled: isVacio // Deshabilita 'vacío'
          }));
        });
        group[field.name] = checkboxGroup;
      } else {
        group[field.name] = new FormControl({
          value: '',
          disabled: field.disabled || false
        });
      }
    });
  
    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      
      const restrictionsControl = this.form.get('Restrictions');
      if (restrictionsControl instanceof FormGroup) {
        const isVacioChecked = restrictionsControl.get('vacío')?.value;
        formData.includeBlank = isVacioChecked ? 'true' : 'false';
      }
      
      this.formSubmit.emit(formData);
    } else {
      console.error('Formulario inválido');
    }
  }
}