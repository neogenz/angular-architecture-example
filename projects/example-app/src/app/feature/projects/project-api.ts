import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { ProjectDetails } from './models/project-details';
import { Project } from './models/project-list-item';

@Injectable({
  providedIn: 'root',
})
export class ProjectApi {
  getProjects$(): Observable<Project[]> {
    return of(projectsMock).pipe(delay(1000));
  }

  getProject$(id: string): Observable<ProjectDetails> {
    return of(projectsMock.find((project) => project.id === id)!).pipe(
      delay(500),
      map((project) => ({
        ...project,
        status: 'active',
        team: [
          'Marie Dubois',
          'Jean Martin',
          'Sophie Laurent',
          'Pierre Durand',
        ],
        technologies: [
          'Angular',
          'TypeScript',
          'Angular Material',
          'Tailwind CSS',
          'Firebase',
        ],
        progress: 65,
        startDate: '2024-01-15',
        endDate: '2024-06-30',
        budget: 45000,
      }))
    );
  }
}

const projectsMock = [
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
