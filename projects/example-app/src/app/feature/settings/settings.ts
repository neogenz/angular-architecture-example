import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserProfileHeader } from './components/user-profile-header';

@Component({
  selector: 'my-org-settings',
  imports: [UserProfileHeader],
  template: `
    <div class="settings-page">
      <my-org-user-profile-header class="mb-8" />

      <div class="settings-content">
        <h1>Paramètres</h1>
        <p>Gérez vos préférences et paramètres de compte.</p>

        <div class="settings-sections">
          <div class="setting-section">
            <h3>Notifications</h3>
            <p>Configurez vos préférences de notification.</p>
          </div>

          <div class="setting-section">
            <h3>Sécurité</h3>
            <p>Gérez vos paramètres de sécurité et mot de passe.</p>
          </div>

          <div class="setting-section">
            <h3>Préférences</h3>
            <p>Personnalisez votre expérience utilisateur.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .settings-page {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .settings-content h1 {
      margin: 0 0 1rem 0;
      color: #1f2937;
    }

    .settings-sections {
      display: grid;
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .setting-section {
      padding: 1.5rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .setting-section h3 {
      margin: 0 0 0.5rem 0;
      color: #374151;
    }

    .setting-section p {
      margin: 0;
      color: #6b7280;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {}
