import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'my-org-project-team',
  imports: [MatIconModule, MatChipsModule],
  template: `
    <section class="space-y-6">
      <h2 class="text-title-large text-on-surface flex items-center gap-3">
        <mat-icon class="text-primary">group</mat-icon>
        Équipe projet
      </h2>

      <div class="bg-surface-container rounded-3xl p-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          @for (member of team(); track member) {
            <div
              class="bg-tertiary-container rounded-2xl p-6 text-center space-y-3"
            >
              <div
                class="bg-tertiary rounded-full w-16 h-16 mx-auto flex items-center justify-center"
              >
                <mat-icon class="text-on-tertiary text-2xl">person</mat-icon>
              </div>
              <p
                class="text-body-medium text-on-tertiary-container font-medium"
              >
                {{ member }}
              </p>
            </div>
          }
        </div>
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
export class ProjectTeamComponent {
  team = input.required<string[]>();
}
