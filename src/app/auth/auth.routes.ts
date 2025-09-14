import { Routes } from '@angular/router';


export default [
  { path: '', redirectTo: 'viagens', pathMatch: 'full' },
  { path: 'viagens', loadComponent: () => import('./flights/flights.component') },
  { path: 'viagens/:id', loadComponent: () => import('./flight-details/flight-details.component') },
  { path: 'solicitacoes', loadComponent: () => import('./solicitations/solicitations.component') },
  { path: 'solicitacoes/:id', loadComponent: () => import('./solicitations-details/solicitations-details.component') },
  { path: 'objetos', loadComponent: () => import('./luggages/luggages.component') },
  { path: 'objetos/:id', loadComponent: () => import('./luggage-details/luggage-details.component') },
  { path: 'objetos/novo/adicionar-objeto', loadComponent: () => import('./add-luggage/add-luggage.component') },
  { path: 'perfil', loadComponent: () => import('./profile/profile.component') },
] as Routes;
