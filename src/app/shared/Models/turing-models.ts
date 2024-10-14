// Alfabeto
// Hacer un regex a partir de esto
class Alphabet {
    constructor(public text: string) {} // Primary
}

// Estados


class State {
   
    public beforeState: State | null = null;
    public aftereState: State | null = null;

    constructor(public nameState: string) {
        this.nameState = nameState;
        this.beforeState = null;
        this.aftereState = null;
    }
   
    getBeforeState(): State | null {
        return this.beforeState;
    }
    getAfterState(): State | null {
        return this.aftereState;
    }

}

    // Si no tiene anterior es inicial -> Solo puede haber 1 
    // Si no tiene siguiente es final -> Pueden haber varios
    // Si contiene anterior y siguiente es normal 

const verifyStateType =  (state:State) =>{
        if (state.getBeforeState() === null)
            return -1;//Es inicial
        if (state.getAfterState() === null)
            return 1//Es final
        if (state.getBeforeState() !== null && state.getAfterState() !== null)
            return 0;//Es normal
}

// Transiciones No se pueden repetir
class Transition {
    constructor(
        public transitionName: string, // Primary
        public start: State,
        public end: State,
        public entry: Alphabet
    ) {}
}

// Cadena de entrada debe guardarse en bd?
// Guardar un registro
class Entry {
    constructor(
        public id_entryChaing: number, // primary increment
        public entryChain: string
    ) {}
}

// Maquina de turing
class TuringMachine {
    constructor(
        public alphabet: string[],
        public transitions: Transition[],
        public entryChain: string
    ) {}
}
