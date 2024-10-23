import { Component, inject, Input } from '@angular/core';
import { TuringMachine } from '../../Models/turingMachineModels';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dynamictable',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './dynamictable.component.html',
  styleUrls: ['./dynamictable.component.scss']
})
export class DynamictableComponent {
  private readonly router = inject(Router);

  @Input() dataTable!: TuringMachine[];
  @Input() link!: string;

  constructor(public dialog: MatDialog) {}

  openDialog(id: any): void {
    console.log(id)
    const machineId = id 
    // Pasa el 'id' a través de la propiedad 'data'
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: { id: machineId } // Aquí pasas los datos
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró con:', result);
      // Aquí puedes manejar la opción seleccionada
    });
  }
}
