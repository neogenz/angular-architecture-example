import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { ProjectDetails } from '@features/projects/models/project-details';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'my-org-project-general-information',
  imports: [MatIconModule, MatButtonModule, DatePipe, CurrencyPipe],
  template: `
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Informations du projet -->
      <div class="bg-surface-container rounded-3xl p-8 space-y-6">
        <h2 class="text-title-large text-on-surface flex items-center gap-3">
          <mat-icon class="text-primary">info</mat-icon>
          Informations
        </h2>

        <div class="space-y-5">
          <div class="flex items-center gap-4">
            <div class="bg-primary-container rounded-full p-3 flex">
              <mat-icon class="text-on-primary-container">event</mat-icon>
            </div>
            <div>
              <p class="text-label-medium text-on-surface-variant">
                Date de début
              </p>
              <p class="text-body-large text-on-surface">
                {{ project().startDate | date: 'dd.MM.yyyy' }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="bg-secondary-container rounded-full p-3 flex">
              <mat-icon class="text-on-secondary-container"
                >event_available</mat-icon
              >
            </div>
            <div>
              <p class="text-label-medium text-on-surface-variant">
                Date de fin
              </p>
              <p class="text-body-large text-on-surface">
                {{ project().endDate | date: 'dd.MM.yyyy' }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="bg-tertiary-container rounded-full p-3 flex">
              <mat-icon class="text-on-tertiary-container"
                >attach_money</mat-icon
              >
            </div>
            <div>
              <p class="text-label-medium text-on-surface-variant">
                Budget total
              </p>
              <p class="text-body-large text-on-surface font-medium">
                {{ project().budget | currency: 'CHF' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Progression -->
      <div class="bg-surface-container rounded-3xl p-8 space-y-6">
        <h2 class="text-title-large text-on-surface flex items-center gap-3">
          <mat-icon class="text-primary">trending_up</mat-icon>
          Progression
        </h2>

        <div class="space-y-6">
          <div class="text-center">
            <div class="text-display-small text-primary font-bold">
              {{ project().progress }}%
            </div>
            <p class="text-label-medium text-on-surface-variant mt-1">
              Avancement
            </p>
          </div>

          <div class="space-y-3">
            <div class="w-full bg-surface-container-highest rounded-full h-3">
              <div
                class="bg-primary h-3 rounded-full transition-all duration-500 ease-out"
                [style.width.%]="project().progress"
              ></div>
            </div>
            <div
              class="flex justify-between text-label-small text-on-surface-variant"
            >
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistiques rapides -->
      <div class="bg-surface-container rounded-3xl p-8 space-y-6">
        <h2 class="text-title-large text-on-surface flex items-center gap-3">
          <mat-icon class="text-primary">analytics</mat-icon>
          Statistiques
        </h2>

        <div class="space-y-5">
          <div class="text-center">
            <div class="text-headline-medium text-on-surface">
              {{ project().team.length }}
            </div>
            <p class="text-label-medium text-on-surface-variant">
              Membres équipe
            </p>
          </div>

          <div class="text-center">
            <div class="text-headline-medium text-on-surface">
              {{ project().technologies.length }}
            </div>
            <p class="text-label-medium text-on-surface-variant">
              Technologies
            </p>
          </div>

          <div class="text-center">
            <div class="text-headline-medium text-on-surface">
              {{ daysRemaining() }}
            </div>
            <p class="text-label-medium text-on-surface-variant">
              Jours restants
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectGeneralInformationComponent {
  project = input.required<ProjectDetails>();

  daysRemaining = computed(() => {
    const projectValue = this.project();
    if (!projectValue) {
      return 0;
    }
    const endDate = new Date(projectValue.endDate);
    const today = new Date();
    const timeDiff = endDate.getTime() - today.getTime();
    const daysRemainingValue = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysRemainingValue;
  });
}
