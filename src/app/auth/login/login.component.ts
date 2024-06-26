import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';
import { signInErrorMessages } from 'src/app/shared/utils/validation.fn';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined;
  private isSubmitted = false;
  isError = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginInitForm();
  }

  loginInitForm(): void {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
    });
  }

  isValid(controlName: string): boolean | undefined {
    return (
      this.loginForm?.controls[controlName]?.valid &&
      this.isSubmitted &&
      !this.isError
    );
  }

  isInvalid(controlName: string): boolean {
    return (
      (this.loginForm?.controls[controlName]?.invalid && this.isSubmitted) ||
      this.isError
    );
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm?.controls[controlName];
    if (control?.errors?.['required']) return `${controlName} is required`;
    if (control?.errors?.['email']) return 'Please enter the valid Email';
    return '';
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (!this.loginForm?.valid) return;
    this.authService
      .signIn(
        this.loginForm.get('Email')?.value,
        this.loginForm.get('Password')?.value
      )
      .subscribe((user) => {
        if (user?.error) {
          this.errorMessage = signInErrorMessages(user.error.message);
          this.isError = true;
        } else {
          this.router.navigate(['shell/dashboard']);
        }
      });
  }
}
