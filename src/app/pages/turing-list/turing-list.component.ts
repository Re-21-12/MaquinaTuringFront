import { Component, inject, OnInit } from '@angular/core';
import { DynamictableComponent } from '../../shared/components/dynamictable/dynamictable.component';
import { MachinesService } from '../../api/turing-machine/machines.service';
import { HttpClientModule } from '@angular/common/http';
import { TuringMachine } from '../../shared/Models/turingMachineModels';
import { DynamicheaderComponent } from "../../shared/components/dynamicheader/dynamicheader.component";

@Component({
  selector: 'app-turing-list',
  standalone: true,
  imports: [DynamictableComponent, HttpClientModule, DynamicheaderComponent],
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

  async getTuringMachines() {
    let res = await this.turingMachineService.getTuringMachines().subscribe({
      next: (response) => {
        console.log('Se obtuvieron las maquinas de Turing', response);
        this.dataTable = response
     
      },
      error: (error) => {
        console.error('Error al obtener las maquinas de Turing:', error);
      },
    });
  }
}
