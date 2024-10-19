import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
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
import { HotTableModule, HotTableComponent } from '@handsontable/angular';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import Handsontable from 'handsontable/base';
import { registerAllModules } from 'handsontable/registry';
import { checkbox } from '../../Models/form';
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
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.scss'],
  providers: [FormBuilder, Validators],
})
export class DynamicFormComponent implements OnInit, AfterViewInit, OnChanges {
  form: FormGroup = new FormGroup({});
  @Input() submit_text!: string;
  @Input() formName!: string;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() value = new EventEmitter<any>();
  formConfig: any;
  estados: string[] = [];
  entradas: string[] = [];
  tableData: any;
  optionState: checkbox[] = [];
  @ViewChild('hotTableRef') hotTableRef!: HotTableComponent;
  MAQUINA_TURING = {
    datos: {},
    transiciones: [],
  };

  private fb = inject(FormBuilder);

  ngOnInit() {
    this.formConfig = Forms.find((form) => form.formName === this.formName);
    if (!this.formConfig) {
      this.formConfig = Forms[0];
    }
    this.initializeForm();
  }

  ngAfterViewInit() {
    this.updateHotTableSettings();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['estados'] || changes['entradas']) {
      this.updateHotTableSettings();
    }
  }

  updateHotTableSettings() {
    if (this.hotTableRef) {
      const newSettings: Handsontable.GridSettings = {
        ...this.settings,
        data: this.generateData(),
        rowHeaders: this.customRowHeaders,
        colHeaders: this.customColumnHeaders,
      };
      this.hotTableRef.updateHotTable(newSettings);
    }
  }

  valueChangedStates(event: Event) {
    const inputValue = (event.target as HTMLTextAreaElement).value;
    this.estados = inputValue.split(',');
    this.updateHotTableSettings();
  }

  valueChangedAlphabet(event: Event) {
    const inputValue = (event.target as HTMLTextAreaElement).value;
    this.entradas = inputValue.split(',');
    this.updateHotTableSettings();
  }

  initializeForm() {
    const group: any = {};

    this.formConfig.fields.forEach((field: any) => {
      const validators = this.getValidators(field);
      if (field.name === 'Estados') {
        group[field.name] = new FormControl({ value: 'q0', disabled: false });
      } else if (field.name === 'Estado Inicial Q0') {
        group[field.name] = new FormControl({ value: 'q0', disabled: true });
      } else if (field.name === 'Simbolo Blanco') {
        group[field.name] = new FormControl({ value: '#', disabled: true });
      } else if (field.name === 'Alfabeto de Entrada') {
        group[field.name] = new FormControl({ value: '#', disabled: false });
      } else if (field.name === 'Estados Finales') {
        const estadosFinalesGroup = this.fb.group({});
        this.optionState.forEach((option: checkbox) => {
          estadosFinalesGroup.addControl(
            option.name,
            new FormControl(option.value)
          );
        });
        group[field.name] = estadosFinalesGroup;
      } else if (field.type === 'checkboxList') {
        const checkboxGroup = this.fb.group({});
        field.checkboxes.forEach((checkbox: checkbox) => {
          checkboxGroup.addControl(
            checkbox.name,
            new FormControl(checkbox.value)
          );
        });
        group[field.name] = checkboxGroup;
      } else {
        group[field.name] = new FormControl('', validators);
      }
    });

    this.form = this.fb.group(group);
  }
  setSelect(event: any) {
    let options = event.target.value.split(',');
    this.optionState = options
      .filter((option: string) => option !== 'q0')
      .map((option: string) => ({
        name: option,
        label: option,
        value: false,
      }));

    const estadosFinalesGroup = this.form.get('Estados Finales') as FormGroup;
    if (estadosFinalesGroup) {
      // Remove controls for options that no longer exist
      Object.keys(estadosFinalesGroup.controls).forEach((key) => {
        if (!this.optionState.some((option) => option.name === key)) {
          estadosFinalesGroup.removeControl(key);
        }
      });

      // Add controls for new options
      this.optionState.forEach((option: checkbox) => {
        if (!estadosFinalesGroup.contains(option.name)) {
          estadosFinalesGroup.addControl(option.name, new FormControl(false));
        }
      });
    }
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
      const formValue = { ...this.form.value };

      // Process Estados Finales
      if (formValue['Estados Finales']) {
        formValue['Estados Finales'] = Object.keys(formValue['Estados Finales'])
          .filter((key) => formValue['Estados Finales'][key])
          .join(',');
      }

      // Process other fields as needed
      this.MAQUINA_TURING.datos = formValue;
      console.log(JSON.stringify(this.MAQUINA_TURING));

      this.formSubmit.emit(formValue);
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

  customRowHeaders = (rowIndex: any) => {
    const alphabet = this.entradas;
    // Puedes mostrar números o letras. Aquí mostramos letras de A-Z
    return alphabet[rowIndex] || rowIndex + 1; // Usa letras si hay suficientes, sino vuelve a números.
  };

  customColumnHeaders = (colIndex: any) => {
    const states = this.estados;
    // Puedes mostrar números o letras. Aquí mostramos letras de A-Z
    return states[colIndex] || colIndex + 1; // Usa letras si hay suficientes, sino vuelve a números.
  };

  generateData = (
    rows = this.entradas.length,
    columns = this.estados.length
  ) => {
    const array2d = [...new Array(rows)].map((_) =>
      [...new Array(columns)].map((_) => null)
    );

    return array2d;
  };
  onTableChange = (event: any) => {
    event.preventDefault();
    this.tableData = this.hotTableRef.data;
    this.MAQUINA_TURING.transiciones = this.tableData;
    console.log(this.tableData);
  };

  settings: Handsontable.GridSettings = {
    height: 'auto',
    contextMenu: true,
    manualRowMove: true,
    bindRowsWithHeaders: 'strict',
    autoWrapRow: true,
    autoWrapCol: true,
    licenseKey: 'non-commercial-and-evaluation',
    colHeaders: this.customColumnHeaders,
  };
}
