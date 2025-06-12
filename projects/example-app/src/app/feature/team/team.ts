import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserApiService } from '@core/user';
import { UserAvatar } from '@ui/user-avatar';

@Component({
  selector: 'my-org-team',
  imports: [UserAvatar],
  template: `
    <div class="team-page">
      <h1 class="text-3xl font-bold mb-6 text-[var(--mat-sys-on-surface)]">
        Équipe
      </h1>

      @if (team(); as members) {
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          @for (member of members; track member.id) {
            <my-org-user-avatar
              [firstName]="member.firstName"
              [lastName]="member.lastName"
              [email]="member.email"
              [avatar]="member.avatar"
              [role]="member.role"
              [department]="member.department"
            />
          }
        </div>
      } @else {
        <p>Chargement de l'équipe...</p>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .team-page {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Team {
  readonly #userApiService = inject(UserApiService);
  readonly team = toSignal(this.#userApiService.getTeam());
}
