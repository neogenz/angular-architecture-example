import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'my-org-team',
  imports: [],
  template: ` <p>team works!</p> `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Team {}
