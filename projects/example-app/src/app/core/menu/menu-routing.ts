import { Injectable } from '@angular/core';
import { MenuButton } from '@ui/menu-button';

@Injectable({
  providedIn: 'root',
})
export class MenuRouting {
  getItemLabel(): string {
    return 'Menu';
  }

  isMenuButton(button: MenuButton): boolean {
    return button.itemLabel() === 'Menu';
  }
}
