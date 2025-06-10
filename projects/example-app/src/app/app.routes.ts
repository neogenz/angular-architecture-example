import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () => import('./feature/home/home.routes'),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./feature/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./feature/analytics/analytics').then((m) => m.Analytics),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./feature/projects/projects').then((m) => m.Projects),
  },
  {
    path: 'team',
    loadComponent: () => import('./feature/team/team').then((m) => m.Team),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./feature/settings/settings').then((m) => m.Settings),
  },
  {
    path: '**', // fallback route (can be used to display dedicated 404 lazy feature)
    redirectTo: '',
  },
];
