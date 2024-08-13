import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Patient } from 'src/app/models';
import { BookingService, PatientService } from 'src/app/services';
import * as PatientsActions from '../actions/patients.actions';

@Injectable({ providedIn: 'root' })
export class PatientsEffects {
  constructor(
    private actions$: Actions,
    private patientService: PatientService,
    private bookingService: BookingService
  ) {}

  getAllPatients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientsActions.loadAllPatients),
      mergeMap(() => {
        return this.patientService.getAllPatients();
      }),
      map((patients: Patient[]) => {
        if (patients.length < 1) {
          return PatientsActions.loadAllPatientsNoData();
        }
        return PatientsActions.loadAllPatientsSuccess({ patients });
      }),
      catchError(() => of(PatientsActions.loadAllPatientsFailure()))
    );
  });

  getSinglePatient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientsActions.searchForPatient),
      mergeMap((action) => {
        return this.patientService.searchForPatient(
          action.firstName,
          action.lastName
        );
      }),
      map((patient: Patient[]) => {
        if (patient.length < 1) {
          return PatientsActions.searchForPatientNoData();
        }
        return PatientsActions.searchForPatientSuccess({ patient });
      }),
      catchError(() => of(PatientsActions.searchForPatientFailure))
    );
  });

  createBookingForPatient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientsActions.createBookingForPatient),
      mergeMap(({ appointment }) => {
        return this.bookingService.createBooking(appointment);
      }),
      map(() => PatientsActions.createBookingForPatientSuccess()),
      catchError(() => of(PatientsActions.createBookingForPatientFailure))
    );
  });
}
