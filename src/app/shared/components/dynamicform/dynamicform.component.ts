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
  Validators,
} from '@angular/forms';
import { Forms } from '../../Models/form';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HotTableModule } from '@handsontable/angular';
import { DynamicSpreadsheetComponent } from '../dynamicspreedsheat/dynamicspreedsheat.component';
import { CommonModule } from '@angular/common';
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
    HotTableModule,
    DynamicFormComponent,
    DynamicSpreadsheetComponent,
    CommonModule
  ],
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.scss'],
  providers: [FormBuilder, Validators],
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  @Input() submit_text!: string;
  @Input() formName!: string;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() value = new EventEmitter<any>();
  formConfig: any;
  estados: any[] = [];
  entradas: any[] = [];
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.formConfig = Forms.find((form) => form.formName === this.formName);
    if (!this.formConfig) {
      this.formConfig = Forms[0];
    }
    this.initializeForm();
  }
  valueChangedStates(event: Event) {
    const inputValue = (event.target as HTMLTextAreaElement).value;
    this.estados = inputValue.split(',');
    console.log(this.estados);
  }
  valueChangedAlphabet(event: Event) {
    const inputValue = (event.target as HTMLTextAreaElement).value;
    this.entradas = inputValue.split(',');
    console.log(this.entradas);
  }



  initializeForm() {
    const group: any = {};

    this.formConfig.fields.forEach((field: any) => {
      const validators = this.getValidators(field); // Obtiene los validadores para cada campo
      if (field.name === 'Estado Inicial Q0') {
        // Inicializa el campo con un valor por defecto y validadores
        group[field.name] = new FormControl({value:'q0', disabled:true}); // Asegúrate de que el control se crea aquí
      } else if (field.type === 'checkboxList') {
        const checkboxGroup = this.fb.group({});
        field.checkboxes.forEach((checkbox: any) => {
          if (checkbox.name === 'vacío') {
            checkboxGroup.addControl(
              checkbox.name,
              new FormControl({ value: true, disabled: true })
            );
          } else {
            checkboxGroup.addControl(checkbox.name, new FormControl(false));
          }
        });
        group[field.name] = checkboxGroup;
      } else {
        group[field.name] = new FormControl('', validators); // Se inicializan otros controles
      }
    });

    this.form = this.fb.group(group); // Crea el grupo de formularios
}


  getValidators(field: any) {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.min !== undefined) {
      validators.push(Validators.min(field.min));
    }
    if (field.max !== undefined) {
      validators.push(Validators.max(field.max));
    }
    if (field.pattern) {
      validators.push(Validators.pattern(field.pattern));
    }
    return validators;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Este campo es requerido';
      }
      if (control.errors['min']) {
        return `El valor mínimo es ${control.errors['min'].min}`;
      }
      if (control.errors['max']) {
        return `El valor máximo es ${control.errors['max'].max}`;
      }
      if (control.errors['pattern']) {
        return 'El formato no es válido';
      }
    }
    return '';
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      console.error('Formulario inválido');
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
