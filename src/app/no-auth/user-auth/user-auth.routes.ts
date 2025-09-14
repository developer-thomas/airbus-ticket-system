import { Routes } from '@angular/router';

export default [
  { path: '', loadComponent: () => import('./login/login.component') },
  {
    path: 'cadastro',
    loadComponent: () => import('./register/register.component'),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./confirmate-code/confirmate-code.component').then((m) => m.ConfirmateCodeComponent)
  }

] as Routes;
