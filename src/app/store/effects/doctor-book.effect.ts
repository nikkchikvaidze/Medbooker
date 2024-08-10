import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { AttendeeType, Booking, BookingRequest, Roles } from 'src/app/models';
import { BookingService, DoctorService } from 'src/app/services';
import * as DoctorBookActions from '../actions/doctor-book.actions';

@Injectable({ providedIn: 'root' })
export class DoctorBookEffects {
  constructor(
    private actions$: Actions,
    private doctorService: DoctorService,
    private bookingService: BookingService
  ) {}

  getSelectedDoctor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DoctorBookActions.loadSingleDoctorBook),
      mergeMap((action) => {
        return this.doctorService.getSingleDoctor(action.entityNo);
      }),
      map((doctor) => DoctorBookActions.loadSingleDoctorSuccess({ doctor })),
      catchError(() => of(DoctorBookActions.loadSingleDoctorFailure))
    );
  });

  createBookingForDoctor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DoctorBookActions.createBookingForDoctor),
      switchMap(({ booking }) => {
        return this.bookingService.createBooking(booking);
      }),
      map((booking: Booking) =>
        DoctorBookActions.createBookingForDoctorSuccess({ booking })
      ),
      catchError(() => of(DoctorBookActions.createBookingForDoctorFailure))
    );
  });
}
