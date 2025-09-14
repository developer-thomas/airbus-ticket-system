import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./quotation-list/quotation-list.component')
  },
  {
    path: 'detalhes/:id',
    loadComponent: () => import('./quotation-detail/quotation-detail.component')
  }
] as Routes;
