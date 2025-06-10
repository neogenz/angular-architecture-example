import {
  Routes,
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';

import {
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export interface CoreOptions {
  routes: Routes; // possible to extend options with more props in the future
}

export function provideCore({ routes }: CoreOptions) {
  return [
    provideZonelessChangeDetection(),

    // reasonable default for most applications
    provideAnimationsAsync(),

    provideRouter(
      routes,
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
      withComponentInputBinding(),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),

    // other 3rd party libraries providers like NgRx, provideStore()

    // other application specific providers and setup

    // perform initialization, has to be last
    provideAppInitializer(() => {
      // ...
    }),
  ];
}
