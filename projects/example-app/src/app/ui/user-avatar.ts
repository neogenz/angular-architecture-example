import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'my-org-user-avatar',
  imports: [MatCardModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-content>
        <div class="flex items-center gap-4">
          <div class="flex-shrink-0">
            <img
              [src]="avatar()"
              [alt]="firstName() + ' ' + lastName()"
              class="w-20 h-20 rounded-full object-cover border-2 border-[var(--mat-sys-outline-variant)]"
            />
          </div>
          <div class="flex-1 min-w-0">
            <h2
              class="text-2xl font-semibold text-[var(--mat-sys-on-surface)] mb-2 truncate"
            >
              {{ firstName() }} {{ lastName() }}
            </h2>
            <p
              class="text-[var(--mat-sys-on-surface-variant)] text-sm mb-1 truncate"
            >
              {{ email() }}
            </p>
            <p
              class="text-[var(--mat-sys-on-surface-variant)] text-xs font-medium truncate opacity-70"
            >
              {{ role() }} - {{ department() }}
            </p>
          </div>
        </div>
      </mat-card-content>
      <mat-card-actions>
        <ng-content select="[card-actions]" />
      </mat-card-actions>
    </mat-card>
  `,
  styles: `
    :host {
      display: block;
    }

    mat-card-actions:empty {
      min-height: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatar {
  email = input.required<string>();
  firstName = input.required<string>();
  lastName = input.required<string>();
  avatar = input.required<string>();
  role = input.required<string>();
  department = input.required<string>();
}
