import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('../app/pages/home/home/home.component'),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () => import('../app/pages/turing-list/turing-list.component').then(m => m.TuringListComponent),
    title: 'Listado de Formularios de Turing' /* Bromita  */,
  },
  {
    path: 'form',
    loadComponent: () => import('../app/pages/turingform/turingform.component'),
    title: 'Formulario de Turing' /* Bromita  */,
  },
  {
    path: 'forms',
    children: [
      {
        path: 'alphabetForm',
        loadComponent: () =>
          import(
            '../app/pages/forms/alphabet-form/alphabet-form.component'
          ).then((m) => m.AlphabetFormComponent),
        title: 'Formulario de Creaccion de Alfabeto',
      },
      {
        path: 'stateForm',
        loadComponent: () =>
          import('../app/pages/forms/state-form/state-form.component').then(
            (m) => m.StateFormComponent
          ),
        title: 'Formulario de Creaccion de Estado',
      },
      {
        path: 'transitionForm',
        loadComponent: () =>
          import(
            '../app/pages/forms/transition-form/transition-form.component'
          ).then((m) => m.TransitionFormComponent),
        title: 'Formulario de Creaccion de Transiciones',
      },
    ],
  },
  /*   {
    path: 'doc',
    loadComponent: () => import('../app/pages/home/home/home.component'),
  },
 */
];
