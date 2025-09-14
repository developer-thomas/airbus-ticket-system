import { Routes } from '@angular/router';
import { NoAuthComponent } from './no-auth/no-auth.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: NoAuthComponent,
    loadChildren: () => import('./no-auth/no-auth.routes'),
  },
  {
    path: 'plataforma',
    component: AuthComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./auth/auth.routes'),
  },
];
