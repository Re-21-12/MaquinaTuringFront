import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MachinesService } from '../../../api/turing-machine/machines.service';
import { TuringMachine } from '../../Models/turingMachineModels';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCommonModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-execute-machine',
  standalone: true,
  imports: [HttpClientModule, MatIconModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatCommonModule, CommonModule],
  templateUrl: './execute-machine.component.html',
  styleUrls: ['./execute-machine.component.scss'],
  providers: [MachinesService],
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
  executeMachine: any;
  turingMachines: any;
  nullSize: number = 30;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getMachineById(this.id);
  }

  async getMachineById(id: any) {
    // Intentar obtener la máquina de Turing desde localStorage
    const storedMachine = localStorage.getItem(`turingMachines`);

    if (storedMachine) {
      // Si hay una máquina almacenada, parsearla y asignarla
      this.turingMachines = JSON.parse(storedMachine);

      this.turingMachines.forEach((element: any) => {
        console.log(
          'Se obtuvo la máquina de Turing desde localStorage',
          element
        );
        if (element.id == id) {
          console.log(
            'Se obtuvo la máquina de Turing desde localStorage',
            element
          );
          this.turing_machine = element;
        }
      });
      console.log(
        'Se obtuvo la máquina de Turing desde localStorage',
        this.turing_machine
      );

      this.initializeTapeAndTransitions();
    } else {
      // Si no hay máquina almacenada, realizar la llamada al servicio
      this.turingMachineService.getTuringMachine(id).subscribe({
        next: (response) => {
          console.log(
            'Se obtuvo la máquina de Turing desde el servicio',
            response
          );
          this.turing_machine = response;

          // Guardar la máquina en localStorage para futuros accesos
          localStorage.setItem(`turingMachine_${id}`, JSON.stringify(response));

          this.initializeTapeAndTransitions();
        },
        error: (error) => {
          console.error('Error al obtener la máquina de Turing:', error);
        },
      });
    }
  }

  /*   async getMachineById(id: any) {
    this.turingMachineService.getTuringMachine(id).subscribe({
      next: (response) => {
        console.log('Se obtuvo la máquina de Turing', response);
        this.turing_machine = response;
        this.initializeTapeAndTransitions();
      },
      error: (error) => {
        console.error('Error al obtener la máquina de Turing:', error);
      },
    });
  } */


  findFirstIndexTape(words: string[]) {
    console.log(words)
    for(let word of words){
      if(word.length == 1){
        console.log(words.indexOf(word));
        return words.indexOf(word);
      }
    }
    console.log(0);
    return 0
  }

  initializeTapeAndTransitions() {
    this.tape = new Array(this.nullSize).fill('null');

    const inputSymbols = this.turing_machine.alfabetoCinta;
    console.log('Símbolos de entrada:', inputSymbols);

    let newTape = this.tape.splice(
      0,
      inputSymbols.length,
      ...new Array(this.nullSize).fill('null').concat(inputSymbols.split(''))
    );
    this.headPosition = this.findFirstIndexTape(this.tape);
    this.currentState = this.turing_machine.estados.split(',')[0].trim();
    this.transitionRules = this.parseTransitions(
      this.turing_machine.transiciones
    );
    this.isAccepted = false;
    this.resultMessage = '';
  }

  parseTransitions(transitions: string): any[] {
    return transitions.split(',').map((transition) => {
      const [fromState, read, toState, write, direction] = transition
        .trim()
        .split(' ');
      return { fromState, read, toState, write, direction };
    });
  }

  step() {
    const currentSymbol = this.tape[this.headPosition];

    // Corregimos la búsqueda de transición
    const transition = this.transitionRules.find(
      (t) => t.fromState === this.currentState && t.read === currentSymbol
    );

    console.log('Estado actual:', this.currentState);
    console.log('Símbolo actual:', currentSymbol);
    console.log('Transición encontrada:', transition);

    if (transition) {
      // Escribir el nuevo símbolo en la cinta
      this.tape[this.headPosition] = transition.write;

      // Actualizar el estado
      this.currentState = transition.toState;

      // Mover el cabezal según la dirección
      switch (transition.direction) {
        case 'R':
          this.headPosition++;
          break;
        case 'L':
          this.headPosition--;
          break;
        case 'S':
          // No mover el cabezal
          break;
        default:
          console.error('Dirección no válida:', transition.direction);
      }

      // Asegurar que el cabezal no se salga de los límites
      this.headPosition = Math.max(
        0,
        Math.min(this.tape.length - 1, this.headPosition)
      );

    } 
    this.checkAcceptance();
  }

  run() {
    let maxSteps = 1000; // Límite de seguridad para evitar bucles infinitos
    let steps = 0;

    while (
      !this.isAccepted &&
      this.headPosition >= 0 &&
      this.headPosition < this.tape.length &&
      steps < maxSteps
    ) {
      const currentSymbol = this.tape[this.headPosition];
      const transition = this.transitionRules.find(
        (t) => t.fromState === this.currentState && t.read === currentSymbol
      );

      if (!transition) {
        this.resultMessage = 'No hay más transiciones disponibles.';
        break;
      }

      this.step();
      steps++;
    }

    if (steps >= maxSteps) {
      this.resultMessage = 'Se alcanzó el límite máximo de pasos.';
    }
  }

  checkAcceptance() {
    const finalStates = this.turing_machine.estadosFinales
      .split(',')
      .map((state) => state.trim());

    if (finalStates.includes(this.currentState)) {
      this.isAccepted = true;
      this.resultMessage = 'Cadena aceptada.';
    } else if (this.headPosition < 0 || this.headPosition >= this.tape.length) {
      this.resultMessage = 'Cadena rechazada.';
    }
  }

  reset() {
    this.initializeTapeAndTransitions();
  }
}
