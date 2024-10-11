export const Forms: any[] = [
  {
    formName: '404Form',
  },
  {
    formName: 'alphabetForm',
    fields: [
      {
        name: 'alphabet',
        type: 'textarea',
        label: 'Alfabeto (λ para vacío)',
        placeholder: 'Ingresa el alfabeto (e.g. a,b,c,λ)',
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
        label: 'Estado final λ ',
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
        label: 'Entrada ',
        placeholder: 'Entrada',
        optios: [],
      },
    ],
  },
  {
    formName:'entryForm',
    fields:[
      {
        name: 'entryChain',
        type: 'text',
        label: 'Cadena a procesar',
        placeholder: 'Ingresa la entrada de la cadena a procesar',
      },
    ]
  },
  {
    formName: 'turingForm',
    fields: [
      {
        name: 'inputString',
        type: 'text',
        label: 'Cadena a procesar',
        placeholder: 'Ingresa la cadena a procesar',
      },
      {
        name: 'tapeDisplay',
        type: 'textarea',
        label: 'Cinta y cabezal',
        placeholder: 'Visualización de la cinta y cabezal de lectura/escritura',
        readOnly: true, // Campo solo de lectura para mostrar los resultados
      },
    ],
  },
];
