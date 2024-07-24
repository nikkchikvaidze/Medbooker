// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, map, mergeMap, of } from 'rxjs';
// import { AttendeeType, BookingRequest, Roles } from 'src/app/models';
// import { BookingService, DoctorService } from 'src/app/services';
// import * as DoctorBookActions from '../actions/doctor-book.actions';

// @Injectable({ providedIn: 'root' })
// export class DoctorBookEffects {
//   constructor(
//     private actions$: Actions,
//     private doctorService: DoctorService,
//     private bookingService: BookingService
//   ) {}

//   getSelectedDoctor$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(DoctorBookActions.loadSingleDoctorBook),
//       mergeMap((action) => {
//         return this.doctorService.getSingleDoctor(action.entityNo);
//       }),
//       map((doctor) => DoctorBookActions.loadSingleDoctorSuccess({ doctor })),
//       catchError(() => of(DoctorBookActions.loadSingleDoctorFailure))
//     );
//   });

//   createBookingForDoctor$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(DoctorBookActions.createBookingForDoctor),
//       mergeMap((action) => {
//         let startDate = new Date(action.pickedTime);
//         let endDate = new Date(startDate.getTime() + 30 * 60000);
//         const appointment: BookingRequest = {
//           attendees: [
//             {
//               attendeeType: AttendeeType.PATIENT,
//               entity: {
//                 entityNo: action.currentUser.entityNo,
//                 firstName: action.currentUser.firstName,
//                 lastName: action.currentUser.lastName,
//               },
//               entityNo: Roles.Patient,
//             },
//             {
//               attendeeType: AttendeeType.PROVIDER,
//               entity: {
//                 entityNo: action.selectedDoctor.entityNo,
//                 firstName: action.selectedDoctor.firstName,
//                 lastName: action.selectedDoctor.lastName,
//               },
//               entityNo: action.selectedDoctor.entityNo,
//             },
//           ],
//           startDate: startDate.toISOString(),
//           description: 'appointment for doctor',
//           title: 'book',
//           endDate: endDate.toISOString(),
//           id: 0,
//           organiser: Roles.Patient,
//         };
//         return this.bookingService.createBooking(appointment);
//       }),
//       map(() => DoctorBookActions.createBookingForDoctorSuccess()),
//       catchError(() => of(DoctorBookActions.createBookingForDoctorFailure))
//     );
//   });
// }
