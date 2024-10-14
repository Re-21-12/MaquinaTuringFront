//Alfabeto
//Hacer un regex a partir de esto
interface Alphabet {
    text: string ; //Primary

}
//Estados

interface State {
    //el text va a ser la primary
    nameState: string;// Primary
}

interface normalState {
    nameState: string;
    //anterior
    beforeState: normalState;
    //siguiente
    aftereState: normalState;


    //si no tiene anterior es inicial

    //si no tiene siguiente es final

    //Si contiene anterior y siguiente es normal
    isNormalState()
}



//Transiciones No se pueden reptir
interface Transition {
    transitionName: string; //Primary
    start: State;
    end: State;
    entry: Alphabet;
}

//Cadena de entrada debe guardarse en bd?
//Guardar un registro
interface Entry {
    id_entryChaing: number; //primary increment
    entryChain: string;
}
//Maquina de turing
interface TuringMachine {
    //Solo va a contener la letra del estado
    
    alphabet: string[];
 
    transitions: Transition[];
    entryChain: string;
}