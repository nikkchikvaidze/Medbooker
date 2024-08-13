import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, takeUntil } from 'rxjs';
import { BookingRequest, Patient, Status } from 'src/app/models';
import { Roles } from 'src/app/models/user.model';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';
import { AppState } from 'src/app/store/states/app.state';
import * as AuthSelectors from '../../store/selectors/auth.selector';
import * as PatientsActions from '../../store/actions/patients.actions';
import * as PatientsSelectors from '../../store/selectors/patients.selector';

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

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.getLoggedInUserEntityNo();
    this.loadAllPatients();
    this.createSearchForm();
    this.getSearchFormValues();
    this.getAllPatients();
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
    this.store.dispatch(PatientsActions.loadAllPatients());
  }

  getAllPatients(): void {
    this.patients$ = this.store.select(PatientsSelectors.getAllPatientsList);
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
        const firstName = value.firstName?.toLowerCase();
        const lastName = value.lastName?.toLowerCase();
        if (!firstName && !lastName) {
          this.getAllPatients();
        } else {
          this.store.dispatch(
            PatientsActions.searchForPatient({ firstName, lastName })
          );
          this.patients$ = this.store.select(
            PatientsSelectors.getSinglePatient
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
    this.store.dispatch(
      PatientsActions.createBookingForPatient({ appointment })
    );
    this.showAdditionalInformation = false;
  }
}
