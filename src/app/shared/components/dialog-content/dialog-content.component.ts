import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-dialog-content',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './dialog-content.component.html',
})
export class DialogContentComponent implements OnInit {

  ngOnInit(): void {
    console.log(this.data.id)
  }
  
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)
  private readonly dialogRef = inject(MatDialogRef)
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: any }, // Aquí recibes los datos
  ) {}// Aquí recibes los datos
   // Inyección de datos
  navigate(id:any = this.data.id){
    this.router.navigate([`execute/${id}`])
  }
  edit(id:any = this.data.id){
    this.router.navigate([`form/${id}`],{relativeTo: this.route})
  }
  preview(id:any = this.data.id){
    this.router.navigate([`form/preview/${id}`])
  }
  closeDialog(option: string): void {
    this.dialogRef.close(option); // Cierra el diálogo y pasa la opción seleccionada
  }
}
