import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'my-org-analytics',
  imports: [],
  template: ` <p>analytics works!</p> `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Analytics {}
