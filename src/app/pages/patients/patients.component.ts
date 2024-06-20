import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User, UserMetadata } from '@supabase/supabase-js';
import { Observable, debounceTime } from 'rxjs';
import {
  AttendeeType,
  BookingStatusUpdateRequest,
  Patient,
  Status,
} from 'src/app/models';
import { Roles } from 'src/app/models/user.model';
import { AuthService, BookingService } from 'src/app/services';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
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
  ) {}

  ngOnInit(): void {
    this.loadAllPatients();
    this.createSearchForm();
    this.getSearchFormValues();

    this.authService.getUser().subscribe((user) => (this.currentUser = user));
  }

  loadAllPatients() {
    this.patients$ = this.patientService.getAllPatients();
  }

  createSearchForm() {
    this.searchForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    });
  }

  getSearchFormValues() {
    this.searchForm?.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        if (value.firstName === '' && value.lastName === '') {
          this.loadAllPatients();
        } else {
          console.log(value.firstName, value.lastName);
          this.patients$ = this.patientService.searchForPatient(
            value.firstName,
            value.lastName
          );
        }
      });
  }

  showInformation(patient: Patient) {
    this.selectedPatient = patient;
    this.showAdditionalInformation = true;
  }

  createAppointment(selectedPatient: Patient) {
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
    this.bookingService.createBooking(appointment).subscribe((x) => {
      const bookingUpdateBody: BookingStatusUpdateRequest = {
        bookingStatus: Status.CONFIRMED,
        comment: '',
        includeDependent: true,
      };
      this.bookingService
        .updateBooking(x.id, bookingUpdateBody)
        .subscribe(() => {
          this.showAdditionalInformation = false;
        });
    });
  }
}
