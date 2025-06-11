import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ProjectApi } from '../project-api';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'my-org-projects',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  template: `
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (project of projects(); track project.id) {
          <mat-card class="p-4">
            <mat-card-content>
              <h2 class="text-lg font-semibold mb-2">{{ project.name }}</h2>
              <p class="text-sm mb-4">{{ project.description }}</p>
              <div class="text-sm font-medium">
                Assigné à : {{ project.assignedTo.firstName }}
                {{ project.assignedTo.lastName }}
              </div>
            </mat-card-content>
            <mat-card-actions>
              <button matButton [routerLink]="['/projects', project.id]">
                Détails
              </button>
            </mat-card-actions>
          </mat-card>
        } @empty {
          <div class="text-center text-sm text-on-surface-variant">
            En cours de chargement...
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Projects {
  projects = toSignal(inject(ProjectApi).getProjects$());
}
