import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

import { StorageService } from '@core/auth/storage.service';
import { environment } from '@env';

export function AuthInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const storageService = inject(StorageService);
  const token = storageService.getToken();
  if (request.url.startsWith(`${environment.api}`)) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
  }

  return next(request);
}
