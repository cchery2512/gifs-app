import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    //Configura el sistema de rutas de Angular
    provideRouter(routes),
    //provideHttpClient(): Habilita el cliente HTTP de Angular
    //withFetch(): Usa la API moderna fetch() en lugar del tradicional XMLHttpRequest
    provideHttpClient(withFetch()),
    //HashStrategy
    /**
     * HashLocationStrategy: Usa hash-based routing (/#/ruta)
     * PathLocationStrategy: Estrategia por defecto (/ruta)
    */
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ]
};
