import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FileManagerDialog } from '@pattern/file-manager/file-manager-dialog';

@Component({
  selector: 'my-org-analytics',
  imports: [MatButtonModule],
  template: `
    <button matButton="filled" (click)="openFileManagerDialog()">
      Voir les fichiers analytics
    </button>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Analytics {
  readonly #dialog = inject(MatDialog);

  openFileManagerDialog() {
    this.#dialog.open(FileManagerDialog, {
      width: 'auto',
      maxWidth: '95vw',
      minWidth: '600px',
      height: 'auto',
      maxHeight: '90vh',
      autoFocus: true,
      restoreFocus: true,
      data: {
        title: 'Fichiers analytics',
        datasourceId: 'analytics',
      },
    });
  }
}
