import { Component, OnInit } from '@angular/core';
import { Observable, filter, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { AttendeeType, Booking, Status, UpcomingBooking } from 'src/app/models';
import { Roles } from 'src/app/models/user.model';
import { AuthService, BookingService, DoctorService } from 'src/app/services';
import { flattenBookings } from 'src/app/shared/utils/helpers.fn';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';

@Component({
  selector: 'app-health-records',
  templateUrl: './health-records.component.html',
  styleUrls: ['./health-records.component.scss'],
})
export class HealthRecordsComponent extends Unsubscribe implements OnInit {
  passedBookings: Booking[] | undefined;
  selectedBooking: Booking | undefined;
  attendee!: AttendeeType;
  role: number | undefined;

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private doctorService: DoctorService
  ) {
    super();
  }

  ngOnInit(): void {
    // this.authService
    //   .getUser()
    //   .subscribe((user) => (this.role = user?.['entityNo']));
    this.loadPassedBookings();
  }

  //TODO: this method needs update to  get only bookings which are in past
  loadPassedBookings(): void {
    this.authService
      .getUser()
      .pipe(
        switchMap((user) => {
          return this.bookingService.getBookingsForEntity(
            user?.['sub'],
            Roles.Patient
          );
        })
      )
      .pipe(
        map((bookings) =>
          bookings?.filter(
            (booking) => new Date(booking.startTime) < new Date()
          )
        )
      )
      .subscribe((bookings) => (this.passedBookings = bookings));
  }
  // loadPassedBookings(): void {
  //   if (!this.role) return;
  //   this.passedBookings$ = this.bookingService
  //     .getBookingsForEntity(this.role, undefined, new Date().toISOString())
  //     .pipe(
  //       takeUntil(this.unsubscribe$),
  //       map((bookings) =>
  //         flattenBookings(bookings)
  //           .filter((element) => element.status == Status.CONFIRMED)
  //           .sort(
  //             (a, b) =>
  //               Number(new Date(a.startTime)) - Number(new Date(b.startTime))
  //           )
  //       ),
  //       switchMap((bookings) => {
  //         if (this.role == Roles.Doctor) {
  //           return of(bookings);
  //         }
  //         return this.doctorService.getAllDoctors().pipe(
  //           map((doctors) => {
  //             return bookings.map((booking) => {
  //               const doctorsEntity = booking.attendees.find(
  //                 (attendee) => attendee.attendeeType == AttendeeType.PROVIDER
  //               )?.entityNo;
  //               return {
  //                 ...booking,
  //                 practiceName: doctors.find(
  //                   (doctor) => doctor.entityNo == doctorsEntity
  //                 )?.specialty,
  //               };
  //             });
  //           })
  //         );
  //       })
  //     );
  // }
  getSingleBooking(booking: Booking): void {
    this.selectedBooking = booking;
  }
}
