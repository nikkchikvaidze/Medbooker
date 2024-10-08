import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthError } from '@supabase/supabase-js';
import { map, Observable, of, switchMap, takeUntil } from 'rxjs';
import { CreateDoctorRequest, CreatePatientRequest } from 'src/app/models';
import { Specialty } from 'src/app/models/specialty.model';
import { Roles, UserRequest } from 'src/app/models/user.model';
import { AuthService, DoctorService } from 'src/app/services';
import { PatientService } from 'src/app/services/patient.service';
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
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private specialtiesService: SpecialtiesService,
    private doctorService: DoctorService,
    private patientService: PatientService,
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
    const userData: UserRequest = {
      firstName: this.registerForm?.get('Firstname')?.value,
      lastName: this.registerForm?.get('Lastname')?.value,
      role: this.registerForm?.get('role')?.value,
      specialty: this.registerForm?.get('specialty')?.value,
    };

    this.authService
      .signUp(
        this.registerForm?.get('Email')?.value,
        this.registerForm?.get('passwords.Password')?.value,
        userData
      )
      .pipe(
        switchMap((user) => {
          if (user?.error) {
            this.errorMessage = signUpErrorMessage(user.error.message);
            this.isError = true;
            return of(user.error);
          }
          const patientData: CreatePatientRequest = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role,
            entityNo: user?.data.user?.user_metadata['sub'],
          };
          const doctorData: CreateDoctorRequest = {
            ...patientData,
            specialty: userData.specialty,
            coords: {
              lat: 40,
              lng: 40,
            },
          };
          if (userData.role === this.role.Doctor) {
            return this.doctorService.addDoctor(doctorData);
          } else {
            return this.patientService.addPatient(patientData);
          }
        })
      )
      .subscribe((response) => {
        if (!(response instanceof AuthError)) {
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
      specialty: [null],
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

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
