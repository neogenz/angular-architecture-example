import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserApiService } from '@core/user';
import { UserAvatar } from '@ui/user-avatar';

@Component({
  selector: 'my-org-user-profile-header',
  imports: [UserAvatar, MatButtonModule, MatIconModule],
  template: `
    @if (user(); as user) {
      <my-org-user-avatar
        [firstName]="user.firstName"
        [lastName]="user.lastName"
        [email]="user.email"
        [avatar]="user.avatar"
        [role]="user.role"
        [department]="user.department"
      >
        <div card-actions>
          <button matButton color="warn">
            <mat-icon>logout</mat-icon>
            <span>Se déconnecter</span>
          </button>
        </div>
      </my-org-user-avatar>
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
  readonly #userApiService = inject(UserApiService);
  readonly user = toSignal(this.#userApiService.getCurrentUser());
}
