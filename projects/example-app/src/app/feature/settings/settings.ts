import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'my-org-settings',
  imports: [],
  template: ` <p>settings works!</p> `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {}
