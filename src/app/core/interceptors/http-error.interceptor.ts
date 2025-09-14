import { HttpRequest, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function HttpErrorInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const toast = inject(ToastrService);
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      toast.error(`${error.error.errors}`);
      return throwError(() => {});
    })
  );
}
