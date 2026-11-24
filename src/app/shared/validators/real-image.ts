import { AbstractControl, ValidationErrors } from "@angular/forms";



export function realImage(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const file = value.files?.[0];
  if (!file) {
    return { notImage: true };
  }
    return null;
}

