import { Routes } from '@angular/router';
import { Settings } from './settings';
import { UserApi } from './user-api';

export default [
  {
    path: '',
    providers: [UserApi],
    component: Settings,
  },
] as Routes;
