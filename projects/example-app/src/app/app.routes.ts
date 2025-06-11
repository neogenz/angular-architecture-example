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
    loadChildren: () => import('./feature/dashboard/dashboard.routes'),
  },
  {
    path: 'analytics',
    loadChildren: () => import('./feature/analytics/analytics.routes'),
  },
  {
    path: 'projects',
    loadChildren: () => import('./feature/projects/projects.routes'),
  },
  {
    path: 'team',
    loadChildren: () => import('./feature/team/team.routes'),
  },
  {
    path: 'settings',
    loadChildren: () => import('./feature/settings/settings.routes'),
  },
  {
    path: '**', // fallback route (can be used to display dedicated 404 lazy feature)
    redirectTo: '',
  },
];
