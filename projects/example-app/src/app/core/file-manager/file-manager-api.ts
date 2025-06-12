import { Injectable, signal } from '@angular/core';
import {
  FileItem,
  FileOperationResult,
  FileValidationResult,
} from './file-item-model';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileManagerApi {
  readonly #files = signal<FileItem[]>([
    {
      name: 'rules.md',
      content: 'rules.md',
      lastModified: new Date(),
    },
    {
      name: 'rules2.md',
      content: 'rules2.md',
      lastModified: new Date(),
    },
  ]);

  getFiles$(datasourceId: string): Observable<FileItem[]> {
    console.log('getFiles simulé', datasourceId);
    return of(this.#files()).pipe(delay(200));
  }

  saveFile(file: FileItem): FileOperationResult<FileItem> {
    const validation = this.#validateRuleFile(file.name, file.content);
    if (!validation.isValid) {
      return {
        success: false,
        errorMessage: validation.errors.join(', '),
      };
    }

    const existingFileIndex = this.#findFileIndex(file.name);

    if (existingFileIndex >= 0) {
      this.#files.update((currentFiles) =>
        currentFiles.map((currentFile, index) =>
          index === existingFileIndex ? file : currentFile
        )
      );
    } else {
      this.#files.update((currentFiles) => [...currentFiles, file]);
    }

    return {
      success: true,
      data: file,
    };
  }

  deleteFile(fileName: string): FileOperationResult {
    const existingFileIndex = this.#findFileIndex(fileName);
    if (existingFileIndex === -1) {
      return {
        success: false,
        errorMessage: 'Fichier non trouvé',
      };
    }

    this.#files.update((currentFiles) =>
      currentFiles.filter((_, index) => index !== existingFileIndex)
    );

    return {
      success: true,
    };
  }

  loadFiles(files: FileItem[]): FileOperationResult<FileItem[]> {
    const validFiles: FileItem[] = [];
    const invalidFiles: string[] = [];

    files.forEach((file) => {
      const validation = this.#validateRuleFile(file.name, file.content);
      if (validation.isValid) {
        validFiles.push(file);
      } else {
        invalidFiles.push(`${file.name}: ${validation.errors.join(', ')}`);
      }
    });

    if (invalidFiles.length > 0) {
      return {
        success: false,
        errorMessage: `Fichiers invalides: ${invalidFiles.join('; ')}`,
      };
    }

    this.#files.set(validFiles);
    return {
      success: true,
      data: validFiles,
    };
  }

  exportFiles(): string {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalFiles: this.#files().length,
      files: this.#files(),
    };

    return JSON.stringify(exportData, null, 2);
  }

  #validateRuleFile(fileName: string, content: string): FileValidationResult {
    const errors: string[] = [];

    if (!fileName.trim()) {
      errors.push('Le nom du fichier est requis');
    }

    if (!fileName.endsWith('.md')) {
      errors.push('Le fichier doit avoir une extension .md');
    }

    if (!content.trim()) {
      errors.push('Le contenu du fichier ne peut pas être vide');
    }

    if (content.length < 10) {
      errors.push('Le contenu doit contenir au moins 10 caractères');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  #findFileIndex(fileName: string): number {
    return this.#files().findIndex((file) => file.name === fileName);
  }
}
