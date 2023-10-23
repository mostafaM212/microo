import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil, tap } from 'rxjs';
import { countryList } from 'src/app/constants/countryList';
import { AuthService } from 'src/app/services/auth.service';
import { passwordAndRepeatedPasswordValidator } from 'src/app/validators/passwordAndRepeatedPasswordMatching';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  countries: string[] = countryList;
  registerForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: [Validators.required, Validators.minLength(6)],
      address: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.minLength(5)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
      visa: [''],
    },
    {
      validators: [passwordAndRepeatedPasswordValidator],
    }
  );
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private tostr: ToastrService,
    private dialogRef: MatDialogRef<RegisterComponent>
  ) {}
  ngOnInit(): void {}
  onRegister() {
    if (this.registerForm.invalid) {
      if (this.registerForm.hasError('invalid')) {
        this.tostr.info('this two is passwords does not match');
        this.registerForm.get('repeatPassword')?.patchValue('');
      } else {
        this.tostr.info('this data is invalid');
      }
      return;
    }
    this.authService
      .addUser(this.registerForm.value)
      .pipe(
        tap((data) => {
          this.tostr.success('the user is created successfully');
          this.dialogRef.close({ data: 'done' });
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  onClose() {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
