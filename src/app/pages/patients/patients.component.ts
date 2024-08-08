import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User, UserMetadata } from '@supabase/supabase-js';
import { Observable, debounceTime, takeUntil } from 'rxjs';
import {
  AttendeeType,
  BookingRequest,
  BookingStatusUpdateRequest,
  Doctor,
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
  currentUser!: Doctor;
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
      .subscribe((user) => {
        if (user) {
          const userInfo = {
            entityNo: user['sub'],
            firstName: user['firstName'],
            lastName: user['lastName'],
            role: user['role'],
            specialty: user['specialty'],
          };
          this.currentUser = userInfo;
        }
        this.bookingService
          .getBookingsForEntity(this.currentUser?.entityNo, Roles.Doctor)
          .subscribe((x) => console.log(x, 'ბუქინგები'));
      });

    this.bookingService
      .getAllBooking()
      .subscribe((x) => console.log(x, 'ყველა'));
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
    const appointment: BookingRequest = {
      doctorEntityNo: this.currentUser?.entityNo,
      patientEntityNo: selectedPatient.entityNo,
      startTime: startDate.toString(),
      description: 'appointment for patient',
      title: 'appointment',
      endTime: endDate.toString(),
      organiser: Roles.Doctor,
      status: Status.PENDING,
    };
    console.log(appointment.startTime);
    this.bookingService
      .createBooking(appointment)
      .subscribe(() => (this.showAdditionalInformation = false));
    //TODO:
    // this.bookingService
    //   .createBooking(appointment)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((x) => {
    //     const bookingUpdateBody: BookingStatusUpdateRequest = {
    //       bookingStatus: Status.CONFIRMED,
    //       comment: '',
    //       includeDependent: true,
    //     };
    //     this.bookingService
    //       .updateBooking(x.id, bookingUpdateBody)
    //       .pipe(takeUntil(this.unsubscribe$))
    //       .subscribe(() => {
    //         this.showAdditionalInformation = false;
    //       });
    //   });
  }
}
