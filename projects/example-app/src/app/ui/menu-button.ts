import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MenuRouting } from '@core/menu/menu-routing';

@Component({
  selector: 'my-org-menu-button',
  imports: [],
  template: `
    <button>
      {{ itemLabel() }}
    </button>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuButton {
  menuRouting = inject(MenuRouting);
  itemLabel = signal(this.menuRouting.getItemLabel());
}
