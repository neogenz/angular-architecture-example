import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'my-org-home',
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  template: `
    <div class="max-w-6xl mx-auto">
      <header class="text-center mb-12">
        <h1
          class="text-4xl md:text-5xl font-normal mb-4 text-[var(--mat-sys-on-surface)] tracking-tight"
        >
          Bienvenue dans Angular workshop
        </h1>
        <p
          class="text-xl md:text-2xl text-[var(--mat-sys-on-surface-variant)] max-w-2xl mx-auto leading-relaxed"
        >
          Votre plateforme de gestion moderne construite avec Angular Material 3
        </p>
      </header>

      <section>
        <h2
          class="text-2xl md:text-3xl font-normal mb-6 text-[var(--mat-sys-on-surface)]"
        >
          Actions rapides
        </h2>
        <div
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 auto-rows-fr"
        >
          <mat-card appearance="outlined" class="flex flex-col h-full">
            <mat-card-content class="text-center p-8 flex-grow">
              <mat-icon class="text-5xl mb-4 text-[var(--mat-sys-primary)]"
                >dashboard</mat-icon
              >
              <h3
                class="text-lg font-medium mb-2 text-[var(--mat-sys-on-surface)]"
              >
                Dashboard
              </h3>
              <p
                class="text-[var(--mat-sys-on-surface-variant)] mb-6 leading-relaxed"
              >
                Consultez vos métriques principales
              </p>
            </mat-card-content>
            <mat-card-actions class="justify-center">
              <button matButton="filled" [routerLink]="['/dashboard']">
                Accéder
              </button>
            </mat-card-actions>
          </mat-card>

          <mat-card appearance="outlined" class="flex flex-col h-full">
            <mat-card-content class="text-center p-8 flex-grow">
              <mat-icon class="text-5xl mb-4 text-[var(--mat-sys-primary)]"
                >analytics</mat-icon
              >
              <h3
                class="text-lg font-medium mb-2 text-[var(--mat-sys-on-surface)]"
              >
                Analytiques
              </h3>
              <p
                class="text-[var(--mat-sys-on-surface-variant)] mb-6 leading-relaxed"
              >
                Explorez vos données
              </p>
            </mat-card-content>
            <mat-card-actions class="justify-center">
              <button matButton="filled" [routerLink]="['/analytics']">
                Voir
              </button>
            </mat-card-actions>
          </mat-card>

          <mat-card appearance="outlined" class="flex flex-col h-full">
            <mat-card-content class="text-center p-8 flex-grow">
              <mat-icon class="text-5xl mb-4 text-[var(--mat-sys-primary)]"
                >folder</mat-icon
              >
              <h3
                class="text-lg font-medium mb-2 text-[var(--mat-sys-on-surface)]"
              >
                Projets
              </h3>
              <p
                class="text-[var(--mat-sys-on-surface-variant)] mb-6 leading-relaxed"
              >
                Gérez vos projets
              </p>
            </mat-card-content>
            <mat-card-actions class="justify-center">
              <button matButton="filled" [routerLink]="['/projects']">
                Gérer
              </button>
            </mat-card-actions>
          </mat-card>

          <mat-card appearance="outlined" class="flex flex-col h-full">
            <mat-card-content class="text-center p-8 flex-grow">
              <mat-icon class="text-5xl mb-4 text-[var(--mat-sys-primary)]"
                >group</mat-icon
              >
              <h3
                class="text-lg font-medium mb-2 text-[var(--mat-sys-on-surface)]"
              >
                Équipe
              </h3>
              <p
                class="text-[var(--mat-sys-on-surface-variant)] mb-6 leading-relaxed"
              >
                Collaborez avec votre équipe
              </p>
            </mat-card-content>
            <mat-card-actions class="justify-center">
              <button matButton="filled" [routerLink]="['/team']">
                Rejoindre
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </section>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
