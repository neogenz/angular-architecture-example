import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  resource,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import { ProjectApi } from '../project-api';
import { ProjectGeneralInformationComponent } from './components/project-general-information';
import { ProjectHeaderComponent } from './components/project-header';
import { ProjectTeamComponent } from './components/project-team';
import { ProjectTechnologiesComponent } from './components/project-technologies';
import { ProjectCursorRulesValidator } from './project-cursor-rules-validator';
import { FileManagerApi } from '@core/file-manager/file-manager-api';
import { FileManagerDialog } from '@pattern/file-manager/file-manager-dialog';
import { ProjectFileList } from './components/project-file-list';

@Component({
  selector: 'my-org-project-details',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    ProjectGeneralInformationComponent,
    ProjectTechnologiesComponent,
    ProjectTeamComponent,
    ProjectHeaderComponent,
    ProjectFileList,
  ],
  template: `
    <div class="min-h-screen bg-surface p-8">
      @if (project.isLoading()) {
        <div
          class="max-w-6xl mx-auto flex items-center justify-center min-h-[50vh]"
        >
          <div class="text-center space-y-4">
            <div
              class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"
            ></div>
            <p class="text-title-medium text-on-surface">
              Chargement du projet...
            </p>
          </div>
        </div>
      } @else if (project.error()) {
        <div
          class="max-w-6xl mx-auto flex items-center justify-center min-h-[50vh]"
        >
          <div class="text-center space-y-4">
            <mat-icon class="text-error text-6xl">error</mat-icon>
            <p class="text-title-medium text-on-surface">
              Erreur lors du chargement
            </p>
            <p class="text-body-medium text-on-surface-variant">
              {{ project.error()?.message }}
            </p>
            <button mat-flat-button color="primary" (click)="project.reload()">
              <mat-icon class="mr-2">refresh</mat-icon>
              Réessayer
            </button>
          </div>
        </div>
      } @else if (project.value()) {
        <div class="max-w-6xl mx-auto space-y-12">
          <!-- En-tête du projet -->
          <my-org-project-header
            [status]="project.value()!.status"
            [name]="project.value()!.name"
            [description]="project.value()!.description"
            [id]="project.value()!.id"
            (openCursorRulesClicked)="openCursorRulesDialog()"
          />

          <!-- Informations principales -->
          <my-org-project-general-information [project]="project.value()!" />

          <!-- Technologies -->
          <my-org-project-technologies
            [technologies]="project.value()!.technologies"
          />

          <!-- Équipe -->
          <my-org-project-team [team]="project.value()!.team" />

          <!-- Fichiers de règles -->
          @if (isCursorRulesValid()) {
            <my-org-project-file-list [files]="projectFiles.value() || []" />
          } @else {
            <div class="text-center space-y-4">
              <p class="text-title-medium text-on-surface">
                Les fichiers de règles ne sont pas valides
              </p>
            </div>
          }
        </div>
      } @else {
        <div
          class="max-w-6xl mx-auto flex items-center justify-center min-h-[50vh]"
        >
          <div class="text-center space-y-4">
            <mat-icon class="text-on-surface-variant text-6xl"
              >search_off</mat-icon
            >
            <p class="text-title-medium text-on-surface">Projet non trouvé</p>
            <p class="text-body-medium text-on-surface-variant">
              Le projet demandé n'existe pas ou n'est plus accessible.
            </p>
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectDetailsComponent {
  #projectApi = inject(ProjectApi);
  #projectCursorRulesValidator = inject(ProjectCursorRulesValidator);
  #fileManagerApi = inject(FileManagerApi);
  #dialog = inject(MatDialog);

  projectId = input.required<string>();

  project = resource({
    params: () => this.projectId(),
    loader: ({ params }) =>
      firstValueFrom(this.#projectApi.getProject$(params)),
  });

  projectFiles = resource({
    params: () => this.projectId(),
    loader: ({ params }) =>
      firstValueFrom(this.#fileManagerApi.getFiles$(params)),
  });

  isCursorRulesValid = computed(() => {
    const projectValue = this.project.value();
    const projectFiles = this.projectFiles.value();
    if (!projectValue || !projectFiles) {
      return true;
    }
    return this.#projectCursorRulesValidator.validateProjectRules(
      projectFiles,
      projectValue
    );
  });

  openCursorRulesDialog(): void {
    this.#dialog.open(FileManagerDialog, {
      data: {
        datasourceId: this.projectId(),
        title: 'Gestionnaire de règles Cursor',
      },
      width: 'auto',
      maxWidth: '95vw',
      minWidth: '600px',
      height: 'auto',
      maxHeight: '90vh',
      autoFocus: true,
      restoreFocus: true,
    });
  }
}
