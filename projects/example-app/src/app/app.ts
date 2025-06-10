import { Component } from '@angular/core';
import { MainLayout } from './layout/main-layout';

@Component({
  selector: 'my-org-root',
  imports: [MainLayout],
  template: ` <my-org-main-layout /> `,
})
export class AppComponent {}
