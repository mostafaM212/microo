import {
  FormControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';

export const mimeTypeValidator = (
  control: FormControl
): Promise<ValidationErrors> | Observable<ValidationErrors> => {
  const file = control.value as File;
  const fileReader = new FileReader();
  let image: any = '';

  const frObs = Observable.create((observer: Observer<any>) => {
    fileReader.addEventListener('loadend', () => {
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(
        0,
        4
      );
      let header = '';
      let isValid: boolean = false;

      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      switch (header) {
        case '89504e47':
          isValid = true;
          break;
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
          isValid = true;
          break;
        default:
          isValid = false;
          break;
      }
      if (isValid) {
        observer.next(null);
      } else {
        observer.next({ invalidImage: true });
      }

      observer.complete();
    });
  });

  if (file) {
    fileReader.readAsArrayBuffer(file);
  }

  return frObs;
};
