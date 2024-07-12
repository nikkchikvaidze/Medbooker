import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import {
  AttendeeType,
  BookingRequest,
  BookingStatusUpdateRequest,
  Roles,
  Status,
} from 'src/app/models';
import { BookingService } from 'src/app/services';
import * as PatientsActions from '../actions/patients.actions';
import { PatientService } from 'src/app/services/patient.service';

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
      map((patients) => PatientsActions.loadAllPatientsSuccess({ patients })),
      catchError(() => of(PatientsActions.loadAllPatientsFailure()))
    );
  });

  getSinglePatient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientsActions.loadSinglePatient),
      mergeMap((action) => {
        return this.patientService.searchForPatient(
          action.firstName,
          action.lastName
        );
      }),
      map((patient) => PatientsActions.loadSinglePatientSuccess({ patient })),
      catchError(() => of(PatientsActions.loadSinglePatientFailure))
    );
  });
  // TODO: Needs some adjustments
  createBookingForPatient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientsActions.createBookingForPatient),
      mergeMap((action) => {
        let startDate = new Date(action.pickedTime);
        let endDate = new Date(startDate.getTime() + 30 * 60000);
        const appointment: BookingRequest = {
          attendees: [
            {
              attendeeType: AttendeeType.PROVIDER,
              entity: {
                entityNo: action.currentUser.entityNo,
                firstName: action.currentUser.firstName,
                lastName: action.currentUser.lastName,
              },
              entityNo: Roles.Doctor,
            },
            {
              attendeeType: AttendeeType.PATIENT,
              entity: {
                entityNo: action.selectedPatient.entityNo,
                firstName: action.selectedPatient.firstName,
                lastName: action.selectedPatient.lastName,
              },
              entityNo: action.selectedPatient.entityNo,
            },
          ],
          startDate: startDate.toISOString(),
          description: 'appointment for patient',
          title: 'appointment',
          endDate: endDate.toISOString(),
          id: 0,
          organiser: Roles.Doctor,
        };
        return this.bookingService.createBooking(appointment).pipe(
          switchMap((x) => {
            const bookingUpdateBody: BookingStatusUpdateRequest = {
              bookingStatus: Status.CONFIRMED,
              comment: '',
              includeDependent: true,
            };
            return this.bookingService.updateBooking(x.id, bookingUpdateBody);
          })
        );
      }),
      map(() => PatientsActions.createBookingForPatientSuccess()),
      catchError(() => of(PatientsActions.createBookingForPatientFailure))
    );
  });
}
