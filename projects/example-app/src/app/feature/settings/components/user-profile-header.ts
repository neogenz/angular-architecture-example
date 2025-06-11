import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserApi } from '../user-api';

@Component({
  selector: 'my-org-user-profile-header',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  template: `
    @if (user(); as user) {
      <mat-card class="" appearance="outlined">
        <mat-card-content>
          <div class="flex items-center gap-4">
            <div class="flex-shrink-0">
              <img
                [src]="user.avatar"
                [alt]="user.firstName + ' ' + user.lastName"
                class="w-20 h-20 rounded-full object-cover border-2 border-[var(--mat-sys-outline-variant)]"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h2
                class="text-2xl font-semibold text-[var(--mat-sys-on-surface)] mb-2 truncate"
              >
                {{ user.firstName }} {{ user.lastName }}
              </h2>
              <p
                class="text-[var(--mat-sys-on-surface-variant)] text-sm mb-1 truncate"
              >
                {{ user.email }}
              </p>
              <p
                class="text-[var(--mat-sys-on-surface-variant)] text-xs font-medium truncate opacity-70"
              >
                {{ user.role }} - {{ user.department }}
              </p>
            </div>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button matButton color="warn">
            <mat-icon>logout</mat-icon>
            <span>Se déconnecter</span>
          </button>
        </mat-card-actions>
      </mat-card>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class UserProfileHeader {
  readonly #userApi = inject(UserApi);
  readonly user = toSignal(this.#userApi.getCurrentUser());
}
