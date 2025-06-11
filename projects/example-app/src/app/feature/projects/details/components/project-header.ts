import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'my-org-project-header',
  imports: [MatIconModule, MatChipsModule, MatButtonModule],
  template: `
    <header class="space-y-6">
      <div class="flex items-start justify-between">
        <div class="space-y-3">
          <div class="flex items-center gap-4">
            <h1 class="text-display-medium text-on-surface">
              {{ name() }}
            </h1>
            <mat-chip [class]="statusClass()" class="h-10">
              <mat-icon class="mr-2">{{ statusIcon() }}</mat-icon>
              {{ statusLabel() }}
            </mat-chip>
          </div>
          <p class="text-title-small text-on-surface-variant">
            Projet #{{ id() }}
          </p>
        </div>

        <div class="flex gap-3">
          <button mat-stroked-button class="h-12 px-6">
            <mat-icon class="mr-2">edit</mat-icon>
            Modifier
          </button>
          <button
            mat-flat-button
            color="primary"
            class="h-12 px-6"
            (click)="openCursorRulesClicked.emit()"
          >
            <mat-icon class="mr-2">docs</mat-icon>
            Règles Cursor
          </button>
        </div>
      </div>

      <div class="bg-surface-container rounded-3xl p-8">
        <h2 class="text-title-large text-on-surface mb-4">Description</h2>
        <p
          class="text-body-large text-on-surface-variant leading-relaxed max-w-4xl"
        >
          {{ description() }}
        </p>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ProjectHeaderComponent {
  status = input.required<string>();
  name = input.required<string>();
  description = input.required<string>();
  id = input.required<string>();
  openCursorRulesClicked = output<void>();

  statusClass = computed(() => {
    const status = this.status();
    switch (status) {
      case 'active':
        return 'bg-primary text-on-primary';
      case 'completed':
        return 'bg-tertiary text-on-tertiary';
      case 'pending':
        return 'bg-secondary text-on-secondary';
      default:
        return 'bg-surface-variant text-on-surface-variant';
    }
  });

  statusIcon = computed(() => {
    const status = this.status();
    switch (status) {
      case 'active':
        return 'check';
      case 'completed':
        return 'check_circle';
      case 'pending':
        return 'schedule';
      default:
        return 'help';
    }
  });

  statusLabel = computed(() => {
    const status = this.status();
    switch (status) {
      case 'active':
        return 'Actif';
      case 'completed':
        return 'Terminé';
      case 'pending':
        return 'En attente';
      default:
        return 'Inconnu';
    }
  });
}
