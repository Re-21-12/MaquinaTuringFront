import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { HotTableModule, HotTableComponent } from '@handsontable/angular';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import Handsontable from 'handsontable';

@Component({
  selector: 'app-dynamic-spreadsheet',
  standalone: true,
  imports: [HotTableModule, MatButtonModule, CommonModule],
  templateUrl: './dynamicspreedsheat.component.html',
  styleUrls: ['./dynamicspreedsheat.component.scss'],
})
export class DynamicSpreadsheetComponent {

  
  @Input() states: any[] = [];
  @Input() alphabetTape: any = [] = []

  generateData = (rows = this.alphabetTape.length, columns = this.states.length) => {
    console.log(this.alphabetTape.length)
    console.log(this.states.length)
    const array2d = [...new Array(rows)].map((_) =>
      [...new Array(columns)].map((_) => null)
    );

    return array2d;
  };

  // Generar encabezados personalizados para las filas
   customRowHeaders = (rowIndex:any) => {
    
    const alphabet = this.alphabetTape;
    // Puedes mostrar números o letras. Aquí mostramos letras de A-Z
    return alphabet[rowIndex] || rowIndex + 1; // Usa letras si hay suficientes, sino vuelve a números.
  };

   customColumnHeaders = (colIndex:any) => {
    const states =this.states
    // Puedes mostrar números o letras. Aquí mostramos letras de A-Z
    return states[colIndex] || colIndex + 1; // Usa letras si hay suficientes, sino vuelve a números.
  };


  
}