import { Validator, Validators } from '@angular/forms';
export interface option  {
  key: string;
  value: string;
}
export interface checkbox{
  name: string
  type: string
  label: string,
  value: string,
  key:string,
}

export const Forms: any[] = [
  {
    formName: '404Form',
  },
  {
    formName: 'alphabetForm',
    fields: [
      {
        name: 'alphabet',
        type: 'select',
        label: 'Alfabeto para la entrada',
        placeholder: 'Ingresa el alfabeto (e.g. a,b,c,λ)',
        options: [
          { label: 'Ingresa el alfabeto (e.g. a,b,c,λ)', value: '' },
          { label: 'números', value: '0123456789' },
          { label: 'letras minúsculas', value: 'abcdefghijklmnopqsrtuvwxyz' },
          { label: 'letras mayúsculas', value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
          { label: 'letras m y M', value: 'mM' },
          {
            label: 'números y letras minúsculas',
            value: '0123456789abcdefghijklmnopqsrtuvwxyz',
          },
          {
            label: 'números y letras mayúsculas',
            value: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          },
          {
            label: 'números, letras minúsculas y mayúsculas',
            value:
              '0123456789abcdefghijklmnopqsrtuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
          },
          {
            label: 'números, letras minúsculas, mayúsculas y m y M',
            value:
              '0123456789abcdefghijklmnopqsrtuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZmM',
          },
        ],
      },
    ],
  },
  {
    formName: 'stateForm',
    fields: [
      {
        name: 'state',
        type: 'select',
        label: 'Estado',
        placeholder: 'Ingresa el estado (q1, q2, ...)',
      },
      {
        name: 'isInitial',
        type: 'checkbox',
        label: 'Estado inicial q0',
      },
      {
        name: 'isFinal',
        type: 'checkbox',
        label: 'Estado final λ',
      },
    ],
  },
  {
    formName: 'transitionForm',
    fields: [
      {
        name: 'start',
        type: 'select',
        label: 'Donde inicia',
        placeholder: 'Estado en el que inicia',
        optios: [],
      },
      {
        name: 'end',
        type: 'select',
        label: 'Donde termina',
        placeholder: 'Estado en el que termina',
        optios: [],
      },
      {
        name: 'entry',
        type: 'select',
        label: 'Entrada',
        placeholder: 'Entrada',
        optios: [],
      },
    ],
  },
  {
    formName: 'entryForm',
    fields: [
      {
        name: 'entryChain',
        type: 'text',
        label: 'Cadena a Procesar - Alfabeto de Entrada',
        placeholder: 'Ingresa la entrada de la cadena a procesar',
      },
    ],
  },
  {
    formName: 'turingForm',
    fields: [
     
    /*   {
          name: 'Restricciones Alfabeto de Entrada',
        type: 'checkboxList',
        checkboxes: [
          {
            name: 'vacío',
            type: 'checkbox',
            label: 'vacío',
            value: '#',
          },
          {
            name: 'números',
            type: 'checkbox',
            label: 'Incluir números',
            value: 'números',
          },
          {
            name: 'letras minúsculas',
            type: 'checkbox',
            label: 'Incluir letras minúsculas',
            value: 'letras minúsculas',
          },
          {
            name: 'letras mayúsculas',
            type: 'checkbox',
            label: 'Incluir letras mayúsculas',
            value: 'letras mayúsculas',
          },
          {
            name: 'números y letras minúsculas',
            label: 'números y letras minúsculas',
            type: 'checkbox',
            value: '0123456789abcdefghijklmnopqsrtuvwxyz',
          },
          {
            name: 'números y letras mayúsculas',
            label: 'números y letras mayúsculas',
            type: 'checkbox',
            value: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          },
          {
            name: 'números, letras minúsculas y mayúsculas',
            label: 'números, letras minúsculas y mayúsculas',
            type: 'checkbox',
            value:
              '0123456789abcdefghijklmnopqsrtuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
          },
          {
            name: 'números, letras minúsculas, mayúsculas y m y M',
            label: 'números, letras minúsculas, mayúsculas y m y M',
            type: 'checkbox',
            value:
              '0123456789abcdefghijklmnopqsrtuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZmM',
          },
        ], 
      }, */
      
      {
        name: 'Estados',
        type: 'textarea',
        label: 'Estados',
        placeholder: 'Ingresa los estados Q0, Qf',
        required: true,
      },
      {
        name: 'Estado Inicial Q0',
        label: 'Estado Inicial Q0',
        type: 'text',
        placeholder: 'Ingresa el estado inicial q0',
      },
      {
        name: 'Estados Finales',
        type: 'checkboxes',
        placeholder: 'Ingresa el estado final λ',
        options:[] as checkbox[],
        required: true,
      },
      {
        name: 'Simbolo Blanco',
        label: 'Simbolo Blanco',
        type: 'text',
      },
      {
        name: 'Alfabeto de Entrada',
        type: 'text-alphabet',
        label: 'Alfabeto de Entrada',
        placeholder: 'Ingresa una lista de entradas',
        required: true,
      },
      {
        name: 'Alfabeto de La Cinta',
        type: 'text',
        label: 'Alfabeto de la Cinta',
        placeholder: 'Entrada a evaluar',
        required: true,
      },

      {
        /* Las transiciones van en la tabla */
        name: 'Transiciones (q0,S,L/S/R)',
        type: 'table',
        label: 'Transiciones (q0,S,L/S/R)',
        
      },
    ],
  },
];
