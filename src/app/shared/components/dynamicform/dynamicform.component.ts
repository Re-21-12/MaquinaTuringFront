import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Forms } from '../../Models/form'; // Importa la configuración de tus formularios
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatCheckboxModule],
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
      this.formConfig = Forms[0]; // Usa el primer formulario si no se encuentra el específico
    }
    this.initializeForm();
  }

  initializeForm() {
    const group: any = {};

    this.formConfig.fields.forEach((field: any) => {
      // Crea el FormControl y configura el estado 'disabled' si se indica en la configuración
      const control = new FormControl({ value: '', disabled: field.disabled || false }); 
      group[field.name] = control;
      
      // Puedes añadir lógica adicional aquí para habilitar/deshabilitar otros campos
      if (field.name === 'espacio vacío') {
        // Por ejemplo, deshabilitar 'includeBlank' al iniciar
        control.disable();
        control.setValue('false');
      }
    });

    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.valid) {
        const formData = this.form.value;
        
        // Agrega manualmente el valor de includeBlank
        formData.includeBlank = this.form.get('espacio vacío')?.disabled ? 'false' : this.form.get('includeBlank')?.value;

        this.formSubmit.emit(formData);
    } else {
        console.error('Formulario inválido');
    }
}

}
