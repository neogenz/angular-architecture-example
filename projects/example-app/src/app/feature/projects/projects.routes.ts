import { Routes } from '@angular/router';
import { ProjectCursorRulesValidator } from './details/project-cursor-rules-validator';

export default [
  {
    path: '',
    loadComponent: () => import('./list/projects'),
  },
  {
    path: ':projectId',
    providers: [ProjectCursorRulesValidator],
    loadComponent: () => import('./details/project-details'),
  },
] as Routes;
