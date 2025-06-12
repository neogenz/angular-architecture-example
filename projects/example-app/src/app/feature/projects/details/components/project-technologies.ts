import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'my-org-project-technologies',
  imports: [MatIconModule, MatChipsModule],
  template: `
    <section class="space-y-6">
      <h2 class="text-title-large text-on-surface flex items-center gap-3">
        <mat-icon class="text-primary">code</mat-icon>
        Technologies utilisées
      </h2>

      <div class="bg-surface-container rounded-3xl p-8">
        <mat-chip-set class="flex flex-wrap gap-3">
          @for (tech of technologies(); track tech) {
            <mat-chip
              class="bg-secondary-container text-on-secondary-container h-12 px-6 text-body-medium"
            >
              <div class="flex items-center justify-center gap-2">
                <mat-icon class="text-on-surface">settings</mat-icon>
                {{ tech }}
              </div>
            </mat-chip>
          }
        </mat-chip-set>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ProjectTechnologiesComponent {
  technologies = input.required<string[]>();
}
