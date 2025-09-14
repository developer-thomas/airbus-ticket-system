import { Routes } from '@angular/router';
import FlightsComponent from './flights/flights.component';
import { NoAuthComponent } from './no-auth.component';
import { QuotationComponent } from './quotation/quotation.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

export default [
  {
    path: '',
    component: NoAuthComponent,
    children: [
      { path: '', loadComponent: () => import('./home/home.component') },
      {
        path: 'viagens',
        component: FlightsComponent,
        loadChildren: () => import('./flights/flights.routes'),
      },
      {
        path: 'cotacoes',
        component: QuotationComponent,
        loadChildren: () => import('./quotation/quotation.routes'),
      },
      {
        path: 'auth',
        component: UserAuthComponent,
        loadChildren: () => import('./user-auth/user-auth.routes'),
      },
    ],
  },
] as Routes;
