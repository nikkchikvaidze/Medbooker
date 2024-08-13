import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { BookingStatusUpdateRequest, Status } from 'src/app/models';
import { BookingService } from 'src/app/services';
import * as DoctorDashboardAndRequestsActions from '../actions/doctor-dashboard&requests.actions';

@Injectable({ providedIn: 'root' })
export class DocDashboardAndRequestsEffects {
  constructor(
    private actions$: Actions,
    private bookingService: BookingService
  ) {}

  loadDocDashboardAndRequestsBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        DoctorDashboardAndRequestsActions.loadDashboardAndRequestsBookings
      ),
      mergeMap(({ entityNo, role }) => {
        return this.bookingService.getBookingsForEntity(entityNo, role);
      }),
      map((booking) => {
        if (booking.length < 1) {
          return DoctorDashboardAndRequestsActions.loadDashboardAndRequestsBookingsNoData();
        }
        return DoctorDashboardAndRequestsActions.loadDashboardAndRequestsBookingsSuccess(
          {
            booking,
          }
        );
      }),
      catchError(() =>
        of(DoctorDashboardAndRequestsActions.loadPassedBookingsFailure)
      )
    );
  });

  // changeStatusForSelectedBooking$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(DoctorDashboardAndRequestsActions.changeStatusForSelectedBooking),
  //     mergeMap((action) => {
  //       return this.bookingService
  //         .updateBooking(action.id, {
  //           bookingStatus: action.status,
  //           comment: '',
  //           includeDependent: true,
  //         })
  //         .pipe(
  //           map(() => {
  //             return DoctorDashboardAndRequestsActions.loadDashboardAndRequestsBookings(
  //               { entityNo: action.entityNo }
  //             );
  //           })
  //         );
  //     })
  //   );
  // });
}
