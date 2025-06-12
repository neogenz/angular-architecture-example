import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FileItem } from '@core/file-manager/file-item-model';
import { FilesList } from '@ui/files-list';

@Component({
  selector: 'my-org-project-file-list',
  imports: [MatIconModule, FilesList],
  template: `
    <section class="space-y-6">
      <h2 class="text-title-large text-on-surface flex items-center gap-3">
        <mat-icon class="text-primary">rule</mat-icon>
        Fichiers de règles
      </h2>
      <my-org-files-list
        class="rounded-3xl bg-surface-container overflow-hidden"
        [files]="filesItemForList()"
        [supportedActions]="{
          isEditable: false,
          isDeletable: false,
        }"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ProjectFileList {
  files = input.required<FileItem[]>();
  filesItemForList = computed(() => {
    return this.files().map((file) => ({
      name: file.name,
      lastModified: file.lastModified,
    }));
  });
}
