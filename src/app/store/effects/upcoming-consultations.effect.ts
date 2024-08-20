import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Booking, Status } from 'src/app/models';
import { BookingService } from 'src/app/services';
import * as UpcomingActions from '../actions/upcoming-consultations.actions';

@Injectable({ providedIn: 'root' })
export class UpcomingConsultationsEffects {
  constructor(
    private actions$: Actions,
    private bookingService: BookingService
  ) {}

  loadUpcomingConsultationBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpcomingActions.loadUpcomingBookings),
      switchMap(({ entityNo, role }) => {
        return this.bookingService.getBookingsForEntity(entityNo, role);
      }),
      map((bookings: Booking[]) => {
        const UpcomingBookings = bookings
          .filter(
            (booking) =>
              booking.status === Status.CONFIRMED &&
              new Date(booking.startTime) > new Date()
          )
          .sort(
            (a, b) =>
              new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
          );

        if (bookings.length < 1) {
          return UpcomingActions.loadUpcomingBookingsNoData();
        }

        return UpcomingActions.loadUpcomingBookingsSuccess({
          bookings: UpcomingBookings,
        });
      }),
      catchError(() => of(UpcomingActions.loadUpcomingBookingsFailure()))
    );
  });

  changeStatusToSelectedBooking$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpcomingActions.cancelSelectedUpcomingBooking),
      switchMap(({ id, status, role, entityNo }) => {
        return this.bookingService
          .updateBooking(id, status, role, entityNo)
          .pipe(
            map(() => {
              return UpcomingActions.loadUpcomingBookings({
                entityNo,
                role,
              });
            }),
            catchError(() =>
              of(UpcomingActions.cancelSelectedUpcomingBookingFailure())
            )
          );
      })
    );
  });
}
