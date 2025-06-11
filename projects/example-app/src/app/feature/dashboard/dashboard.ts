import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'my-org-dashboard',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  template: `
    <!-- Example: Using Tailwind with Material 3 CSS Variables -->
    <div class="container mx-auto">
      <header class="mb-8">
        <p class="text-[var(--mat-sys-on-surface-variant)]">
          Aperçu de vos métriques principales
        </p>
      </header>

      <!-- Cards Grid - Pure Tailwind Layout + Material Components -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <!-- Metric Card - No custom CSS, pure Material + Tailwind -->
        <mat-card appearance="outlined">
          <mat-card-content class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <p
                  class="text-sm text-[var(--mat-sys-on-surface-variant)] mb-1"
                >
                  Ventes totales
                </p>
                <p
                  class="text-2xl font-semibold text-[var(--mat-sys-on-surface)]"
                >
                  €24,563
                </p>
              </div>
              <mat-icon class="text-[var(--mat-sys-primary)]"
                >trending_up</mat-icon
              >
            </div>
            <div class="flex items-center text-sm">
              <span class="text-green-600 font-medium">+12.5%</span>
              <span class="text-[var(--mat-sys-on-surface-variant)] ml-2"
                >vs mois dernier</span
              >
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card appearance="outlined">
          <mat-card-content class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <p
                  class="text-sm text-[var(--mat-sys-on-surface-variant)] mb-1"
                >
                  Nouveaux clients
                </p>
                <p
                  class="text-2xl font-semibold text-[var(--mat-sys-on-surface)]"
                >
                  847
                </p>
              </div>
              <mat-icon class="text-[var(--mat-sys-secondary)]"
                >group_add</mat-icon
              >
            </div>
            <div class="flex items-center text-sm">
              <span class="text-green-600 font-medium">+8.2%</span>
              <span class="text-[var(--mat-sys-on-surface-variant)] ml-2"
                >vs mois dernier</span
              >
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card appearance="outlined">
          <mat-card-content class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <p
                  class="text-sm text-[var(--mat-sys-on-surface-variant)] mb-1"
                >
                  Commandes
                </p>
                <p
                  class="text-2xl font-semibold text-[var(--mat-sys-on-surface)]"
                >
                  1,234
                </p>
              </div>
              <mat-icon class="text-[var(--mat-sys-tertiary)]"
                >shopping_cart</mat-icon
              >
            </div>
            <div class="flex items-center text-sm">
              <span class="text-red-600 font-medium">-2.1%</span>
              <span class="text-[var(--mat-sys-on-surface-variant)] ml-2"
                >vs mois dernier</span
              >
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Actions Section -->
      <section>
        <h2 class="text-title-large mb-4">Actions rapides</h2>
        <div class="flex flex-wrap gap-3">
          <button mat-flat-button color="primary">
            <mat-icon class="mr-2">add</mat-icon>
            Nouveau projet
          </button>
          <button mat-stroked-button>
            <mat-icon class="mr-2">upload</mat-icon>
            Importer données
          </button>
          <button mat-stroked-button>
            <mat-icon class="mr-2">file_download</mat-icon>
            Exporter rapport
          </button>
        </div>
      </section>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {}
