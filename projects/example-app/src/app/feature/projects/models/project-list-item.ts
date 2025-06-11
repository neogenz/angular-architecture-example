export interface Project {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly assignedTo: {
    readonly firstName: string;
    readonly lastName: string;
  };
}
