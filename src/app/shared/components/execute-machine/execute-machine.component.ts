import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MachinesService } from '../../../api/turing-machine/machines.service';
import { TuringMachine } from '../../Models/turingMachineModels';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-execute-machine',
  standalone:true,
  imports:[HttpClientModule, MatIconModule],
  templateUrl: './execute-machine.component.html',
  styleUrls: ['./execute-machine.component.scss'],
  providers:[MachinesService]
})
export class ExecuteMachineComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly turingMachineService = inject(MachinesService);
  id: any;
  turing_machine!: TuringMachine;

  tape: string[] = []; // Contenido de la cinta
  headPosition: number = 0; // Posición del cabezal
  currentState: string = ''; // Estado actual
  resultMessage: string = ''; // Mensaje de resultado
  isAccepted: boolean = false; // Indica si la cadena es aceptada
  transitionRules: any[] = []; // Reglas de transición

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getMachineById(this.id);
  }

  async getMachineById(id: any) {
    this.turingMachineService.getTuringMachine(id).subscribe({
      next: (response) => {
        console.log('Se obtuvo la máquina de Turing', response);
        this.turing_machine = response;

        // Inicializar la cinta y las reglas de transición
        this.initializeTapeAndTransitions();
      },
      error: (error) => {
        console.error('Error al obtener la máquina de Turing:', error);
      },
    });
  }

  initializeTapeAndTransitions() {
    this.tape = new Array(20).fill(' '); // Inicializar cinta con 20 espacios vacíos
    const inputSymbols = this.turing_machine.alfabetoEntrada.split(',');
    this.tape.splice(0, inputSymbols.length, ...inputSymbols); // Insertar símbolos de entrada en la cinta
    this.headPosition = 0; // Colocar el cabezal en la primera posición
    this.currentState = this.turing_machine.estados.split(',')[0]; // Establecer estado inicial
    this.transitionRules = this.parseTransitions(this.turing_machine.transiciones); // Parsear las transiciones
  }

  parseTransitions(transitions: string): any[] {
    return transitions.split(',').map(transition => {
      const [fromState, symbol, toState, direction] = transition.trim().split(' ');
      return { fromState, symbol, toState, direction };
    });
  }

  step() {
    const currentSymbol = this.tape[this.headPosition];
    const transition = this.transitionRules.find(t => t.fromState === this.currentState && t.symbol === currentSymbol);

    if (transition) {
      this.currentState = transition.toState;
      this.tape[this.headPosition] = transition.symbol; // Actualizar símbolo en la cinta
      this.headPosition += (transition.direction === 'D' ? 1 : -1); // Mover cabezal
      this.headPosition = Math.max(0, Math.min(this.tape.length - 1, this.headPosition)); // Limitar posición del cabezal
      this.checkAcceptance();
    } else {
      this.resultMessage = 'No hay transición definida para el estado y símbolo actuales.';
    }
  }

  run() {
    while (!this.isAccepted && this.headPosition >= 0 && this.headPosition < this.tape.length) {
      this.step();
    }
  }

  checkAcceptance() {
    const finalStates = this.turing_machine.estadosFinales.split(',');
    if (finalStates.includes(this.currentState)) {
      this.isAccepted = true;
      this.resultMessage = 'Cadena aceptada.';
    } else if (this.headPosition < 0 || this.headPosition >= this.tape.length) {
      this.resultMessage = 'Cadena rechazada.';
    } else {
      this.resultMessage = ''; // Sin mensaje en caso de continuar
    }
  }

  reset() {
    this.initializeTapeAndTransitions();
    this.resultMessage = '';
    this.isAccepted = false;
  }
}
