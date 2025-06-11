import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding, withRouterConfig} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {userApiInterceptor} from './shared/interceptors/user-api.interceptor';
import {ReactiveFormsModule} from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({paramsInheritanceStrategy: 'always'}),
    ),
    provideHttpClient(),
    provideHttpClient(
      withInterceptors(
        [
          userApiInterceptor
        ]
      ))
  ]
};
