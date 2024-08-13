import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, takeUntil } from 'rxjs';
import { BookingRequest, Patient, Status } from 'src/app/models';
import { Roles } from 'src/app/models/user.model';
import { BookingService } from 'src/app/services';
import { PatientService } from 'src/app/services/patient.service';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';
import { AppState } from 'src/app/store/states/app.state';
import * as AuthSelectors from '../../store/selectors/auth.selector';

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
  loggedInUserEntityNo: string = '';
  pickedTime = '';
  get today() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }

  constructor(
    private patientService: PatientService,
    private bookingService: BookingService,
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.getLoggedInUserEntityNo();
    this.loadAllPatients();
    this.createSearchForm();
    this.getSearchFormValues();
  }

  getLoggedInUserEntityNo(): void {
    this.store
      .select(AuthSelectors.getLoggedInUserEntityNo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((entityNo) => {
        if (entityNo) {
          this.loggedInUserEntityNo = entityNo;
        }
      });
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
    if (!this.pickedTime && !this.loggedInUserEntityNo) return;
    let startDate = new Date(this.pickedTime);
    let endDate = new Date(startDate.getTime() + 30 * 60000);
    const appointment: BookingRequest = {
      doctorEntityNo: this.loggedInUserEntityNo,
      patientEntityNo: selectedPatient.entityNo,
      startTime: startDate.toString(),
      description: 'appointment for patient',
      title: 'appointment',
      endTime: endDate.toString(),
      organiser: Roles.Doctor,
      status: Status.PENDING,
    };
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
