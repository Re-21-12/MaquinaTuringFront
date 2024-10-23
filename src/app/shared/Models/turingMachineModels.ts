// src/app/models/turing-machine.model.ts

export interface TransicionAutomata {
    id?: number;
    idDatosAutomata: number;
    fila: number;
    columna: number;
    valor: string;
    idDatosAutomataNavigation: DatosAutomata; // Cambiado a DatosAutomata
}

export interface TuringMachine {
    id?: number;
    estados: string;
    estadosFinales: string;
    alfabetoEntrada: string;
    alfabetoCinta: string;
    transiciones:string;
}

// src/app/models/datos-automata.model.ts
export interface DatosAutomata {
    id?: number;
    estados: string;
    estadosFinales: string;
    alfabetoEntrada: string;
    alfabetoCinta: string;
    transicionesAutomata: string[]; // Se mantiene como un array de strings
}

export interface DatosMaquinaTuring {
   'Estados': string;
    'Estados Finales': string;
    'Alfabeto de Entrada': string;
    'Alfabeto Cinta': string;
    'Transiciones' : string;
}

export interface MAQUINA_TURING {
    datos: DatosMaquinaTuring;
    transiciones: any[]; // Cambia `any` por el tipo adecuado si es posible
}