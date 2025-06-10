import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'my-org-projects',
  imports: [],
  template: ` <p>projects works!</p> `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {}
