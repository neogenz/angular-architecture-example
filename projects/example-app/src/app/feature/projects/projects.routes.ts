import { Routes } from '@angular/router';
import { Projects } from './projects';

export default [
  {
    path: '',
    pathMatch: 'full',
    component: Projects,
  },
] as Routes;
