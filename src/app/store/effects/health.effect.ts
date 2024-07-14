import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { AttendeeType, Status } from 'src/app/models';
import { Roles } from 'src/app/models/user.model';
import { BookingService, DoctorService } from 'src/app/services';
import { flattenBookings } from 'src/app/shared/utils/helpers.fn';
import * as HealthActions from '../actions/health.actions';

@Injectable({ providedIn: 'root' })
export class HealthPageEffects {
  role = Roles.Doctor | Roles.Patient;

  constructor(
    private actions$: Actions,
    private bookingService: BookingService,
    private doctorService: DoctorService
  ) {}

  loadPassedBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HealthActions.loadPassedBookings),
      mergeMap((action) => {
        return this.bookingService
          .getBookingForEntity(
            action.entityNo,
            undefined,
            new Date().toISOString()
          )
          .pipe(
            map((bookings) =>
              flattenBookings(bookings)
                .filter((element) => element.status == Status.CONFIRMED)
                .sort(
                  (a, b) =>
                    Number(new Date(a.startTime)) -
                    Number(new Date(b.startTime))
                )
            ),
            switchMap((bookings) => {
              if (this.role == Roles.Doctor) {
                return of(bookings);
              }
              return this.doctorService.getAllDoctors().pipe(
                map((doctors) => {
                  return bookings.map((booking) => {
                    const doctorsEntity = booking.attendees.find(
                      (attendee) =>
                        attendee.attendeeType == AttendeeType.PROVIDER
                    )?.entityNo;
                    return {
                      ...booking,
                      practiceName: doctors.find(
                        (doctor) => doctor.entityNo == doctorsEntity
                      )?.specialty,
                    };
                  });
                })
              );
            })
          );
      }),
      map((bookings) => HealthActions.loadPassedBookingsSuccess({ bookings })),
      catchError(() => of(HealthActions.loadPassedBookingsFailure()))
    );
  });
}
