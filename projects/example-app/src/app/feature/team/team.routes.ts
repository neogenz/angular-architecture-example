import { Routes } from '@angular/router';
import { Team } from './team';

export default [
  {
    path: '',
    pathMatch: 'full',
    component: Team,
  },
] as Routes;
