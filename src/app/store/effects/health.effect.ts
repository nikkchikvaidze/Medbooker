import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Roles } from 'src/app/models/user.model';
import { BookingService } from 'src/app/services';
import * as HealthActions from '../actions/health.actions';

@Injectable({ providedIn: 'root' })
export class HealthPageEffects {
  role = Roles.Doctor | Roles.Patient;

  constructor(
    private actions$: Actions,
    private bookingService: BookingService
  ) {}

  loadPassedBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HealthActions.loadPassedBookings),
      mergeMap(({ entityNo }) => {
        return this.bookingService.getBookingsForEntity(
          entityNo,
          Roles.Patient
        );
      }),
      map((bookings) => {
        const passedBookings = bookings.filter(
          (booking) => new Date(booking.startTime) < new Date()
        );
        return bookings.length < 1
          ? HealthActions.loadPassedBookingsNoData()
          : HealthActions.loadPassedBookingsSuccess({
              bookings: passedBookings,
            });
      }),
      catchError(() => of(HealthActions.loadPassedBookingsFailure()))
    );
  });
}
