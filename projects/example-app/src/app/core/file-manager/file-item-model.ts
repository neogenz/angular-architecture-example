export interface FileItem {
  readonly name: string;
  readonly content: string;
  readonly lastModified: Date;
}
export interface FileValidationResult {
  readonly isValid: boolean;
  readonly errors: string[];
}

export interface FileOperationResult<T = void> {
  readonly success: boolean;
  readonly data?: T;
  readonly errorMessage?: string;
}
