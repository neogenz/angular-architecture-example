import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

interface Project {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly assignedTo: {
    readonly firstName: string;
    readonly lastName: string;
  };
}

@Component({
  selector: 'my-org-projects',
  imports: [MatCardModule],
  template: `
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (project of projects; track project.id) {
          <mat-card class="p-4">
            <h2 class="text-lg font-semibold mb-2">{{ project.name }}</h2>
            <p class="text-sm mb-4">{{ project.description }}</p>
            <div class="text-sm font-medium">
              Assigné à : {{ project.assignedTo.firstName }}
              {{ project.assignedTo.lastName }}
            </div>
          </mat-card>
        }
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  readonly projects: readonly Project[] = [
    {
      id: 'PRJ-001',
      name: 'Site E-commerce',
      description: "Développement d'une plateforme e-commerce moderne.",
      assignedTo: {
        firstName: 'Marie',
        lastName: 'Dubois',
      },
    },
    {
      id: 'PRJ-002',
      name: 'Application Mobile',
      description:
        "Création d'une application mobile pour la gestion des commandes.",
      assignedTo: {
        firstName: 'Jean',
        lastName: 'Martin',
      },
    },
    {
      id: 'PRJ-003',
      name: 'Dashboard Analytics',
      description: 'Interface de visualisation des données business.',
      assignedTo: {
        firstName: 'Sophie',
        lastName: 'Rousseau',
      },
    },
  ];
}
