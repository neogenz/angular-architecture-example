import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

export interface FileItem {
  name: string;
  lastModified: Date;
}

@Component({
  selector: 'my-org-files-list',
  imports: [MatIconModule, MatButtonModule, DatePipe],
  template: `
    @for (file of files(); track file.name) {
      <div
        class="flex items-center p-4 border-b border-outline-variant last:border-b-0 hover:bg-surface-container-high transition-colors"
      >
        <mat-icon class="text-primary mr-4 flex-shrink-0">description</mat-icon>

        <div class="flex-1 min-w-0 mr-4">
          <div class="text-body-large font-medium text-on-surface mb-1">
            {{ file.name }}
          </div>
          <div class="text-body-small text-on-surface-variant">
            Modifié le {{ file.lastModified | date: 'dd.MM.yyyy à HH:mm' }}
          </div>
        </div>

        <div class="flex gap-2 flex-shrink-0">
          @if (supportedActions().isEditable) {
            <button
              matIconButton
              (click)="editClicked.emit(file)"
              [attr.aria-label]="'Éditer le fichier ' + file.name"
              class="text-primary"
            >
              <mat-icon>edit</mat-icon>
            </button>
          }

          @if (supportedActions().isDeletable) {
            <button
              matIconButton
              (click)="deleteClicked.emit(file)"
              [attr.aria-label]="'Supprimer le fichier ' + file.name"
              class="text-error"
            >
              <mat-icon>delete</mat-icon>
            </button>
          }
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class FilesList {
  files = input.required<FileItem[]>();
  supportedActions = input.required<{
    isEditable: boolean;
    isDeletable: boolean;
  }>();

  editClicked = output<FileItem>();
  deleteClicked = output<FileItem>();
}
