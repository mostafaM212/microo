import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private tostr: ToastrService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onClose() {}
  onLogin() {
    this.authService
      .loginUser(this.loginForm.value)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        this.tostr.success('Welcome To Microo App!');
        this.dialogRef.close();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
