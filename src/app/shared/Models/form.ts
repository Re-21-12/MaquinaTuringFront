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
          { label: 'números y letras minúsculas', value: '0123456789abcdefghijklmnopqsrtuvwxyz' },
          { label: 'números y letras mayúsculas', value: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
          { label: 'números, letras minúsculas y mayúsculas', value: '0123456789abcdefghijklmnopqsrtuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' },
          { label: 'números, letras minúsculas, mayúsculas y m y M', value: '0123456789abcdefghijklmnopqsrtuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZmM' },
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
 
      {
        name: 'espacio vacío',
        type: 'checkbox',
        label: 'espacio vacío',
        value: '#',
      },
      {
        name: 'números',
        type: 'checkbox',
        label: 'Incluir números',
        value:'números'
      },
      {
        name: 'letras minúsculas',
        type: 'checkbox',
        label: 'Incluir letras minúsculas',
        value:'letras minúsculas'
      },
      {
        name: 'letras mayúsculas',
        type: 'checkbox',
        label: 'Incluir letras mayúsculas',
        value:'letras mayúsculas'
        
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
