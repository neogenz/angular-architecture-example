import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./analytics'),
  },
] as Routes;
