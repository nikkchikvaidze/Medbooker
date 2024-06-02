import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { ErrorMessages } from 'src/app/models/supabase-error.model';

export function passwordMatcher(c: AbstractControl): ValidationErrors | null {
  const password = c.get('Password');
  const confirmPassword = c.get('Confirmpassword');
  if (password?.pristine || confirmPassword?.pristine) {
    return null;
  }
  if (
    password?.value === confirmPassword?.value &&
    confirmPassword?.value === password?.value
  ) {
    return null;
  }
  return { match: true };
}

export function signInErrorMessages(message: string) {
  switch (message) {
    case ErrorMessages.UserNotFound:
      return 'Incorrect email or password';
    default:
      return '';
  }
}

export function signUpErrorMessage(message: string) {
  switch (message) {
    case ErrorMessages.AlreadyRegistered:
      return 'Email already registered';
    default:
      return '';
  }
}
