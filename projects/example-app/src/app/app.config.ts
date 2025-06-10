import { ApplicationConfig } from '@angular/core';

import { routes } from './app.routes';
import { provideCore } from './core/core';
import { provideLocale } from './core/locale';
import { provideAngularMaterial } from './core/angular-material';

export const appConfig: ApplicationConfig = {
  providers: [
    provideCore({ routes }),
    provideLocale(),
    provideAngularMaterial(),
  ],
};
