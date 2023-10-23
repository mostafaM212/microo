import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  constructor(public fb: UntypedFormBuilder) {}
  getErrorMessage() {
    if (this.emailForm.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailForm.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  save() {}
}
