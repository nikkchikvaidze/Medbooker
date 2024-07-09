import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, takeUntil } from 'rxjs';
import { Specialty } from 'src/app/models/specialty.model';
import { Roles, User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services';
import { SpecialtiesService } from 'src/app/services/specialties.service';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';
import {
  passwordMatcher,
  signUpErrorMessage,
} from 'src/app/shared/utils/validation.fn';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends Unsubscribe implements OnInit {
  role = Roles;
  registerForm: FormGroup | undefined;
  errorMessage = '';
  isError = false;
  private isSubmitted = false;
  isDoctorSelected: boolean = false;
  specialties$: Observable<Specialty[]> =
    this.specialtiesService.getSpecialties();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private specialtiesService: SpecialtiesService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.registerInitForm();
    this.registerForm?.valueChanges
      .pipe(
        map((value) => value.role),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((role) => {
        this.isDoctorSelected = role === this.role.Doctor;
      });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (!this.registerForm?.valid) return;
    const userData: User = {
      firstName: this.registerForm?.get('Firstname')?.value,
      lastName: this.registerForm?.get('Lastname')?.value,
      entityNo: this.registerForm?.get('role')?.value,
      specialty: this.registerForm?.get('specialty')?.value,
    };
    this.authService
      .signUp(
        this.registerForm?.get('Email')?.value,
        this.registerForm?.get('passwords.Password')?.value,
        userData
      )
      .subscribe((user) => {
        if (user?.error) {
          this.errorMessage = signUpErrorMessage(user.error.message);
          this.isError = true;
        } else {
          this.router.navigate(['shell/dashboard']);
        }
      });
  }

  registerInitForm(): void {
    this.registerForm = this.fb.group({
      Firstname: ['', Validators.required],
      Lastname: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group(
        {
          Password: ['', [Validators.required, Validators.minLength(6)]],
          Confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
        },
        { validators: passwordMatcher }
      ),
      role: [this.role.Patient, Validators.required],
      specialty: ['', Validators.required],
    });
  }

  isValid(controlName: string): boolean | undefined {
    return this.registerForm?.controls[controlName]?.valid && this.isSubmitted;
  }

  isInvalid(controlName: string): boolean | undefined {
    return (
      this.registerForm?.controls[controlName]?.invalid && this.isSubmitted
    );
  }

  isValidEmail(controlName: string): boolean | undefined {
    return (
      this.registerForm?.controls[controlName]?.valid &&
      this.isSubmitted &&
      !this.isError
    );
  }

  isInvalidEmail(controlName: string): boolean {
    return (
      (this.registerForm?.controls[controlName]?.invalid && this.isSubmitted) ||
      this.isError
    );
  }

  isInvalidPassword(controlName: string): boolean | undefined {
    return this.registerForm?.get(`passwords`)?.invalid && this.isSubmitted;
  }

  isValidPassword(controlName: string): boolean | undefined {
    return this.registerForm?.get(`passwords`)?.valid && this.isSubmitted;
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm?.controls[controlName];
    if (control?.errors?.['required']) return `${controlName} is required`;
    if (control?.errors?.['email']) return 'Please enter the valid Email';
    return '';
  }

  getErrorMessageForPasswords(controlName: string): string {
    const matchControl = this.registerForm?.controls['passwords'];
    const control = matchControl?.get(controlName);
    if (matchControl?.errors?.['match'] && controlName === 'Confirmpassword') {
      return "Passwords doesn't match";
    }
    if (control?.errors?.['required']) return `Password is required`;
    if (control?.errors?.['minlength'])
      return `Please enter minimum ${control?.errors?.['minlength'].requiredLength} characters`;
    return '';
  }
}
