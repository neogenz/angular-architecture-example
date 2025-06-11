import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FileItem } from './file-item';

@Component({
  selector: 'my-org-file-editor-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  template: `
    <h2 mat-dialog-title>
      @if (isEditMode) {
        <mat-icon class="mr-2">edit</mat-icon>
        Éditer le fichier
      } @else {
        <mat-icon class="mr-2">add</mat-icon>
        Nouveau fichier
      }
    </h2>

    <mat-dialog-content class="min-h-[400px]">
      <div class="space-y-4">
        <mat-form-field class="w-full">
          <mat-label>Nom du fichier</mat-label>
          <input
            matInput
            [(ngModel)]="fileName"
            placeholder="ex: typescript-rules.md"
            [readonly]="isEditMode"
          />
          <mat-icon matSuffix>description</mat-icon>
        </mat-form-field>

        <mat-form-field class="w-full">
          <mat-label>Contenu</mat-label>
          <textarea
            matInput
            [(ngModel)]="fileContent"
            rows="15"
            placeholder="Entrez le contenu de votre fichier de règles ici..."
          >
          </textarea>
        </mat-form-field>

        <div class="text-sm text-gray-600">
          <mat-icon class="text-base mr-1">info</mat-icon>
          Vous pouvez utiliser la syntaxe Markdown pour formater vos règles.
        </div>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end" class="p-4">
      <button matButton (click)="cancel()" [attr.aria-label]="'Annuler'">
        Annuler
      </button>
      <button
        matButton="filled"
        (click)="save()"
        [disabled]="!isValid()"
        [attr.aria-label]="'Sauvegarder le fichier'"
      >
        <mat-icon>save</mat-icon>
        @if (isEditMode) {
          Mettre à jour
        } @else {
          Créer
        }
      </button>
    </mat-dialog-actions>
  `,
  styles: `
    mat-dialog-content {
      overflow: visible;
    }

    textarea {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 14px;
      line-height: 1.5;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileEditorDialog {
  readonly #dialogRef = inject(MatDialogRef<FileEditorDialog>);
  readonly #data: FileItem | null = inject(MAT_DIALOG_DATA);

  fileName = '';
  fileContent = '';

  constructor() {
    if (this.#data) {
      this.fileName = this.#data.name;
      this.fileContent = this.#data.content;
    }
  }

  get isEditMode(): boolean {
    return this.#data !== null;
  }

  isValid(): boolean {
    return (
      this.fileName.trim().length > 0 && this.fileContent.trim().length > 0
    );
  }

  cancel(): void {
    this.#dialogRef.close();
  }

  save(): void {
    if (this.isValid()) {
      const fileData: FileItem = {
        name: this.fileName.trim(),
        content: this.fileContent.trim(),
        lastModified: new Date(),
      };
      this.#dialogRef.close(fileData);
    }
  }
}
