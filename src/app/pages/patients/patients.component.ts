import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User, UserMetadata } from '@supabase/supabase-js';
import { Observable, debounceTime, takeUntil } from 'rxjs';
import {
  AttendeeType,
  BookingStatusUpdateRequest,
  Patient,
  Status,
} from 'src/app/models';
import { Roles } from 'src/app/models/user.model';
import { AuthService, BookingService } from 'src/app/services';
import { PatientService } from 'src/app/services/patient.service';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent extends Unsubscribe implements OnInit {
  patients$: Observable<Patient[]> | undefined;
  searchForm: FormGroup | undefined;
  selectedPatient: Patient | undefined;
  showAdditionalInformation = false;
  currentUser: UserMetadata | undefined;
  pickedTime = '';
  get today() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }

  constructor(
    private patientService: PatientService,
    private bookingService: BookingService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadAllPatients();
    this.createSearchForm();
    this.getSearchFormValues();

    this.authService
      .getUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => (this.currentUser = user));
  }

  loadAllPatients(): void {
    this.patients$ = this.patientService.getAllPatients();
  }

  createSearchForm(): void {
    this.searchForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    });
  }

  getSearchFormValues(): void {
    this.searchForm?.valueChanges
      .pipe(takeUntil(this.unsubscribe$), debounceTime(1000))
      .subscribe((value) => {
        if (value.firstName === '' && value.lastName === '') {
          this.loadAllPatients();
        } else {
          this.patients$ = this.patientService.searchForPatient(
            value.firstName,
            value.lastName
          );
        }
      });
  }

  showInformation(patient: Patient): void {
    this.selectedPatient = patient;
    this.showAdditionalInformation = true;
  }

  createAppointment(selectedPatient: Patient): void {
    if (!this.pickedTime) return;
    let startDate = new Date(this.pickedTime);
    let endDate = new Date(startDate.getTime() + 30 * 60000);
    const appointment = {
      attendees: [
        {
          attendeeType: AttendeeType.PROVIDER,
          entity: {
            entityNo: this.currentUser?.['entityNo'],
            firstName: this.currentUser?.['firstName'],
            lastName: this.currentUser?.['lastName'],
          },
          entityNo: Roles.Doctor,
        },
        {
          attendeeType: AttendeeType.PATIENT,
          entity: {
            entityNo: selectedPatient.entityNo,
            firstName: selectedPatient.firstName,
            lastName: selectedPatient.lastName,
          },
          entityNo: selectedPatient.entityNo,
        },
      ],
      startDate: startDate.toISOString(),
      description: 'appointment for patient',
      title: 'appointment',
      endDate: endDate.toISOString(),
      id: 0,
      organiser: Roles.Doctor,
    };
    this.bookingService
      .createBooking(appointment)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((x) => {
        const bookingUpdateBody: BookingStatusUpdateRequest = {
          bookingStatus: Status.CONFIRMED,
          comment: '',
          includeDependent: true,
        };
        this.bookingService
          .updateBooking(x.id, bookingUpdateBody)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => {
            this.showAdditionalInformation = false;
          });
      });
  }
}
