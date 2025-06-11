import { Routes } from '@angular/router';
import { Settings } from './settings';

export default [
  {
    path: '',
    pathMatch: 'full',
    component: Settings,
  },
] as Routes;
