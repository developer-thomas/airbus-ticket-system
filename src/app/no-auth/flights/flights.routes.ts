import { Routes } from '@angular/router';

export default [
  { path: '', loadComponent: () => import('./list/list.component') },
  {
    path: ':id',
    loadComponent: () => import('./details/details.component'),
  },
  {
    path: ':id/adicionar-passageiros',
    loadComponent: () => import('./flight-companions/flight-companions.component'),
  },
] as Routes;
