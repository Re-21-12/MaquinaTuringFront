import { Component, EventEmitter, inject, Input, input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Forms } from '../../../shared/interfaces/form'; // Importa la configuración de tus formularios

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.scss'],
})
export class DynamicFormComponent implements OnInit {
[x: string]: any;
  form: FormGroup = new FormGroup({});
  //recibe una entrada
  @Input() submit_text!: string;
  @Input() formName!: string;
  //Este va a lanzar los datos a subior
  @Output() formSubmit = new EventEmitter<any>();
  formConfig: any;
  newForm: any;
  index!: number;
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.formConfig = Forms.find((form) => form.formName == this.formName); // Usamos el primer formulario de la lista de Forms
    if (!this.formName) {
      this.formConfig = Forms[0]; // Usamos el primer formulario de la lista de Forms
    }
    this.initializeForm();
    console.dir(this.form);
  }

  initializeForm() {
    // Itera sobre los campos del formulario para generar los FormControls
    const group: any = {};

    this.formConfig.fields.forEach((field: any) => {
      group[field.name] = new FormControl('');
    });
    this.form = this.fb.group(group);
  }
  onSubmit = () =>{
    this.formSubmit.emit(this.form.value);
  }
}
