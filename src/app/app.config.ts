import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
} from '@angular/router';

import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { HttpErrorInterceptor } from '@core/interceptors/http-error.interceptor';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

registerLocaleData(pt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([AuthInterceptor, HttpErrorInterceptor])
    ),
    provideEnvironmentNgxMask({
      validation: true,
    }),
    provideToastr(),
    importProvidersFrom([
      SweetAlert2Module.forRoot(),
      NgxSpinnerModule.forRoot({
        type: 'ball-scale-multiple'
      })
    ]),
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
};
