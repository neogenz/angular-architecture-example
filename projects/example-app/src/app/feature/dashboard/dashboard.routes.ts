import { Routes } from '@angular/router';
import { Dashboard } from './dashboard';

export default [
  {
    path: '',
    pathMatch: 'full',
    component: Dashboard,
  },
] as Routes;
