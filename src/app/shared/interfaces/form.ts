export const Forms: any[] = [ 
    {
      formName: 'alfabetoForm',
      fields: [
        {
          name: 'alphabet', 
          type: 'textarea', 
          label: 'Alfabeto', 
          placeholder: 'Ingresa el alfabeto (e.g. a,b,c)'
        },
        {
          name: 'states', 
          type: 'textarea', 
          label: 'Estados', 
          placeholder: 'Ingresa los estados (e.g. q0,q1,q2)'
        },
        {
          name: 'transitions', 
          type: 'textarea', 
          label: 'Transiciones', 
          placeholder: 'Define las transiciones (e.g. q0,a->q1,b)'
        },
        {
          name: 'inputString', 
          type: 'text', 
          label: 'Cadena a procesar', 
          placeholder: 'Ingresa la cadena a procesar'
        },
        {
          name: 'tapeDisplay', 
          type: 'textarea', 
          label: 'Cinta y cabezal', 
          placeholder: 'Visualización de la cinta y cabezal de lectura/escritura', 
          readOnly: true // Campo solo de lectura para mostrar los resultados
        }
      ]
    }
  ];
  