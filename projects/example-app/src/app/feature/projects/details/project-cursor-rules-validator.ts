import { Injectable } from '@angular/core';
import { FileValidationResult } from '@core/file-manager/file-item-model';
import { ProjectDetails } from '@features/projects/models/project-details';
import { FileItem } from '@core/file-manager/file-item-model';

@Injectable()
export class ProjectCursorRulesValidator {
  validateProjectRules(
    files: FileItem[],
    project: ProjectDetails
  ): FileValidationResult {
    console.log(
      'Ceci est une simulation de règles métier propre à un objet projet',
      files,
      project
    );

    return { isValid: false, errors: ['test'] };
  }
}
