import { AbstractControl, ValidationErrors } from '@angular/forms';

// Fails if the value is a string made only of whitespace
export function forbiddenValue(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (typeof value === 'string' && value.toLowerCase() == "ban") {
    return { forbidden: true };
  }
    return null;
}
