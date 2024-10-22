import { Component, inject, OnInit } from '@angular/core';
import { DynamictableComponent } from '../../shared/components/dynamictable/dynamictable.component';
import { MachinesService } from '../../api/turing-machine/machines.service';
import { HttpClientModule } from '@angular/common/http';
import { TuringMachine } from '../../shared/Models/turingMachineModels';
import { DynamicheaderComponent } from "../../shared/components/dynamicheader/dynamicheader.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-turing-list',
  standalone: true,
  imports: [DynamictableComponent, HttpClientModule, DynamicheaderComponent, MatIconModule, MatButtonModule],
  templateUrl: './turing-list.component.html',
  styleUrl: './turing-list.component.scss',
  providers: [MachinesService],
})
export class TuringListComponent implements OnInit {
  
  dataTable!: TuringMachine[];

  ngOnInit(): void {
    this.getTuringMachines();
  }

  private readonly turingMachineService = inject(MachinesService);


  async clearTuringMachines(){
    localStorage.removeItem('turingMachines');
    window.location.reload();
  }
  async getTuringMachines() {
    // Intentar obtener las máquinas de Turing desde localStorage
    let storedMachines = localStorage.getItem('turingMachines');
    if (storedMachines)
    storedMachines = JSON.parse(storedMachines);
    console.table( storedMachines);
  
    if (storedMachines) {
      // Si hay máquinas almacenadas, parsearlas y asignarlas a dataTable
      this.dataTable = JSON.parse(JSON.stringify(storedMachines));
      console.log('Se obtuvieron las máquinas de Turing desde localStorage', this.dataTable);
    } else {
      // Si no hay máquinas almacenadas, realizar la llamada al servicio
      this.turingMachineService.getTuringMachines().subscribe({
        next: (response) => {
          console.log('Se obtuvieron las máquinas de Turing desde el servicio', response);
          this.dataTable = response;
  
          // Guardar las máquinas en localStorage para futuros accesos
          localStorage.setItem('turingMachines', JSON.stringify(response));
        },
        error: (error) => {
          console.error('Error al obtener las máquinas de Turing:', error);
        },
      });
    }
  }
  

 /*  async getTuringMachines() {
    let res = await this.turingMachineService.getTuringMachines().subscribe({
      next: (response) => {
        console.log('Se obtuvieron las maquinas de Turing', response);
        this.dataTable = response
     
      },
      error: (error) => {
        console.error('Error al obtener las maquinas de Turing:', error);
      },
    });
  } */
}
