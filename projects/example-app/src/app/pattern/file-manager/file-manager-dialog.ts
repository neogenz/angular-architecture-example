import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { FileManagerApi } from '@core/file-manager/file-manager-api';
import { FileItem } from '@core/file-manager/file-item-model';
import { firstValueFrom } from 'rxjs';
import { FileEditorDialog } from './file-editor-dialog';
import { FilesList } from '@ui/files-list';

@Component({
  selector: 'my-org-file-manager-dialog',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    FilesList,
  ],
  template: `
    <h2 mat-dialog-title class="flex items-center gap-3">
      <mat-icon class="text-primary">rule</mat-icon>
      {{ title }}
    </h2>

    <mat-dialog-content
      class="min-h-[500px] max-h-[70vh] overflow-y-auto overflow-x-hidden"
    >
      <div class="space-y-6">
        <div class="bg-surface-container rounded-2xl p-4">
          <p class="text-body-medium text-on-surface-variant mb-4">
            Workshop - Simulation d'édition de fichiers de règles Cursor
          </p>

          <div class="flex flex-wrap gap-3 min-w-0">
            <button
              matButton="filled"
              (click)="openFileEditor()"
              [attr.aria-label]="'Créer un nouveau fichier de règles'"
            >
              <mat-icon class="mr-2">add</mat-icon>
              Nouveau fichier
            </button>

            <button
              matButton="outlined"
              (click)="loadSampleFiles()"
              [attr.aria-label]="'Charger des fichiers exemples'"
            >
              <mat-icon class="mr-2">folder_open</mat-icon>
              Charger exemples
            </button>
          </div>
        </div>

        @if (files().length > 0) {
          <div class="space-y-3">
            <h3 class="text-title-medium text-on-surface">
              Fichiers de règles ({{ files().length }})
            </h3>

            <div class="bg-surface-container rounded-2xl overflow-hidden">
              <my-org-files-list
                [files]="files()"
                [supportedActions]="{
                  isEditable: true,
                  isDeletable: true,
                }"
              />
            </div>
          </div>
        } @else {
          <div class="text-center py-12 space-y-4">
            <div
              class="bg-surface-container rounded-full w-24 h-24 mx-auto flex items-center justify-center"
            >
              <mat-icon class="text-6xl text-on-surface-variant opacity-60"
                >folder_open</mat-icon
              >
            </div>

            <div class="space-y-2">
              <h3 class="text-title-medium text-on-surface">
                Aucun fichier de règles
              </h3>
              <p
                class="text-body-medium text-on-surface-variant max-w-md mx-auto"
              >
                Commencez par créer un nouveau fichier ou charger des exemples
                pour voir vos règles Cursor.
              </p>
            </div>

            <button matButton="tonal" (click)="openFileEditor()" class="mt-4">
              <mat-icon class="mr-2">add</mat-icon>
              Créer votre premier fichier
            </button>
          </div>
        }
      </div>
    </mat-dialog-content>

    <mat-dialog-actions
      align="end"
      class="gap-2 p-6 border-t border-outline-variant"
    >
      <button
        matButton
        (click)="closeDialog()"
        [attr.aria-label]="'Fermer le gestionnaire de règles'"
      >
        Fermer
      </button>

      @if (files().length > 0) {
        <button
          matButton="filled"
          (click)="exportRules()"
          [attr.aria-label]="'Exporter tous les fichiers de règles'"
        >
          <mat-icon class="mr-2">download</mat-icon>
          Exporter
        </button>
      }
    </mat-dialog-actions>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      min-width: 600px;
      max-width: none;
    }

    mat-dialog-content {
      padding: 0 24px;
      overflow-x: hidden;
      word-wrap: break-word;
    }

    .flex {
      flex-wrap: wrap;
    }

    .space-y-6 > * + * {
      margin-top: 1.5rem;
    }

    .space-y-3 > * + * {
      margin-top: 0.75rem;
    }

    .gap-3 {
      gap: 0.75rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileManagerDialog implements OnInit {
  readonly #dialog = inject(MatDialog);
  readonly #dialogRef = inject(MatDialogRef<FileManagerDialog>);
  readonly #fileManagerApi = inject(FileManagerApi);
  readonly #datasourceId = inject(MAT_DIALOG_DATA).datasourceId;
  readonly title = inject(MAT_DIALOG_DATA).title;

  readonly files = signal<FileItem[]>([]);

  ngOnInit(): void {
    this.#loadFiles();
  }

  openFileEditor(existingFile?: FileItem): void {
    const dialogRef = this.#dialog.open(FileEditorDialog, {
      width: '600px',
      maxHeight: '80vh',
      data: existingFile || null,
    });

    dialogRef.afterClosed().subscribe((result: FileItem | undefined) => {
      if (result) {
        this.#saveFile(result);
      }
    });
  }

  editFile(file: FileItem): void {
    this.openFileEditor(file);
  }

  deleteFile(fileName: string): void {
    const result = this.#fileManagerApi.deleteFile(fileName);
    if (result.success) {
      this.#loadFiles();
    } else {
      console.error('Erreur lors de la suppression:', result.errorMessage);
    }
  }

  loadSampleFiles(): void {
    const sampleFiles: FileItem[] = [
      {
        name: 'typescript-rules.md',
        content:
          '# Règles TypeScript\n\n- Utiliser des types stricts\n- Éviter any\n- Utiliser inject() au lieu du constructeur',
        lastModified: new Date(),
      },
      {
        name: 'angular-components.md',
        content:
          '# Composants Angular\n\n- Utiliser OnPush\n- Éviter les suffixes\n- Utiliser des signaux',
        lastModified: new Date(),
      },
    ];

    const result = this.#fileManagerApi.loadFiles(sampleFiles);
    if (result.success) {
      this.#loadFiles();
    } else {
      console.error('Erreur lors du chargement:', result.errorMessage);
    }
  }

  closeDialog(): void {
    this.#dialogRef.close();
  }

  exportRules(): void {
    const exportData = this.#fileManagerApi.exportFiles();
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(exportData);
    const exportFileDefaultName = `cursor-rules-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-CH', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date);
  }

  async #loadFiles(): Promise<void> {
    const files = await firstValueFrom(
      this.#fileManagerApi.getFiles$(this.#datasourceId)
    );
    this.files.set(files);
  }

  #saveFile(file: FileItem): void {
    const result = this.#fileManagerApi.saveFile(file);
    if (result.success) {
      this.#loadFiles();
    } else {
      console.error('Erreur lors de la sauvegarde:', result.errorMessage);
    }
  }
}
