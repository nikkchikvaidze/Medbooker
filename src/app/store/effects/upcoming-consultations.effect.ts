import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import {
  AttendeeType,
  Booking,
  BookingStatusUpdateRequest,
  Status,
} from 'src/app/models';
import { Roles } from 'src/app/models/user.model';
import { BookingService, DoctorService } from 'src/app/services';
import { flattenBookings } from 'src/app/shared/utils/helpers.fn';
import * as UpcomingActions from '../actions/upcoming-consultations.actions';

@Injectable({ providedIn: 'root' })
export class UpcomingConsultationsEffects {
  role = Roles.Doctor | Roles.Patient;

  constructor(
    private actions$: Actions,
    private bookingService: BookingService,
    private doctorService: DoctorService
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

  // changeStatusToSelectedBooking$ = createEffect(() => {
  //   const bookingUpdateBody: BookingStatusUpdateRequest = {
  //     bookingStatus: Status.CANCELLED,
  //     comment: '',
  //     includeDependent: true,
  //   };
  //   return this.actions$.pipe(
  //     ofType(UpcomingActions.cancelSelectedUpcomingBooking),
  //     mergeMap((action) => {
  //       return this.bookingService
  //         .updateBooking(action.id, bookingUpdateBody)
  //         .pipe(
  //           map(() => {
  //             return UpcomingActions.loadUpcomingBookings({
  //               entityNo: action.entityNo,
  //             });
  //           })
  //         );
  //     })
  //   );
  // });
}
