import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideRouter(routes, withInMemoryScrolling({ 
          anchorScrolling: 'enabled',
          scrollPositionRestoration: 'top' 
        })),
        provideHttpClient(),
        CookieService
  ]
};
