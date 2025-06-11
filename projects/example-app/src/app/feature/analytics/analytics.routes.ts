import { Routes } from '@angular/router';
import { Analytics } from './analytics';

export default [
  {
    path: '',
    pathMatch: 'full',
    component: Analytics,
  },
] as Routes;
