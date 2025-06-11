import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'my-org-team',
  imports: [],
  template: ` Moi : Marie Dupont `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Team {}
