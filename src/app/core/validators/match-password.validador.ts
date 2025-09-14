import { AbstractControl } from '@angular/forms';
export function matchPasswordValidador(form: AbstractControl) {
  const password: string = form.get('password')?.value ?? '';
  const passwordConfirmation: string = form.get('confirmPassword')?.value ?? '';

  if (password.trim() + passwordConfirmation.trim()) {
    return password === passwordConfirmation ? null : { matchPassword: true };
  } else {
    return null;
  }
}
