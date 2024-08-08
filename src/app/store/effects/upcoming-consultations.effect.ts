// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
// import {
//   AttendeeType,
//   BookingStatusUpdateRequest,
//   Status,
// } from 'src/app/models';
// import { Roles } from 'src/app/models/user.model';
// import { BookingService, DoctorService } from 'src/app/services';
// import { flattenBookings } from 'src/app/shared/utils/helpers.fn';
// import * as UpcomingActions from '../actions/upcoming-consultations.actions';

// @Injectable({ providedIn: 'root' })
// export class UpcomingConsultationsEffects {
//   role = Roles.Doctor | Roles.Patient;

//   constructor(
//     private actions$: Actions,
//     private bookingService: BookingService,
//     private doctorService: DoctorService
//   ) {}

//   loadUpcomingConsultationBooking$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(UpcomingActions.loadUpcomingBookings),
//       mergeMap((action) => {
//         return this.bookingService
//           .getBookingsForEntity(
//             action.entityNo,
//             new Date().toISOString(),
//             undefined
//           )
//           .pipe(
//             map((bookings) =>
//               flattenBookings(bookings)
//                 .filter((element) => element.status == Status.CONFIRMED)
//                 .sort(
//                   (a, b) =>
//                     Number(new Date(a.startTime)) -
//                     Number(new Date(b.startTime))
//                 )
//             ),
//             switchMap((bookings) => {
//               if (this.role == Roles.Doctor) {
//                 return of(bookings);
//               }
//               return this.doctorService.getAllDoctors().pipe(
//                 map((doctors) => {
//                   return bookings.map((booking) => {
//                     const doctorsEntity = booking.attendees.find(
//                       (attendee) =>
//                         attendee.attendeeType == AttendeeType.PROVIDER
//                     )?.entityNo;
//                     return {
//                       ...booking,
//                       practiceName: doctors.find(
//                         (doctor) => doctor.entityNo == doctorsEntity
//                       )?.specialty,
//                     };
//                   });
//                 })
//               );
//             })
//           );
//       }),
//       map((bookings) =>
//         UpcomingActions.loadPassedBookingsSuccess({ bookings })
//       ),
//       catchError(() => of(UpcomingActions.loadPassedBookingsFailure()))
//     );
//   });

//   changeStatusToSelectedBooking$ = createEffect(() => {
//     const bookingUpdateBody: BookingStatusUpdateRequest = {
//       bookingStatus: Status.CANCELLED,
//       comment: '',
//       includeDependent: true,
//     };
//     return this.actions$.pipe(
//       ofType(UpcomingActions.cancelSelectedUpcomingBooking),
//       mergeMap((action) => {
//         return this.bookingService
//           .updateBooking(action.id, bookingUpdateBody)
//           .pipe(
//             map(() => {
//               return UpcomingActions.loadUpcomingBookings({
//                 entityNo: action.entityNo,
//               });
//             })
//           );
//       })
//     );
//   });
// }
