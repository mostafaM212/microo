import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordAndRepeatedPasswordValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  console.log('test', group, 'dsdsd');

  let password = group.get('password')?.value;
  let repeatedPassword = group.get('repeatPassword')?.value;
  console.log('test', password, repeatedPassword);

  if (password == repeatedPassword) {
    return null;
  }

  return {
    invalid: true,
  };
};
