import { Routes } from '@angular/router';
import { CursorRulesManagerService } from './details/cursor-rules-manager/cursor-rules-manager.service';

export default [
  {
    path: '',
    loadComponent: () => import('./list/projects'),
  },
  {
    path: ':projectId',
    providers: [CursorRulesManagerService],
    loadComponent: () => import('./details/project-details'),
  },
] as Routes;
