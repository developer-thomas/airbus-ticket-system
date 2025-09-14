import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@core/auth/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(StorageService)
  const router = inject(Router)

  if (service.hasToken()) {
    return true
  }

  router.navigate([''])
  return false;
};
