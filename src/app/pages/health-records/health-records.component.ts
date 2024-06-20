import { Component, OnInit } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { AttendeeType, Booking, Status, UpcomingBooking } from 'src/app/models';
import { Roles } from 'src/app/models/user.model';
import { AuthService, BookingService, DoctorService } from 'src/app/services';
import { flattenBookings } from 'src/app/shared/utils/helpers.fn';

@Component({
  selector: 'app-health-records',
  templateUrl: './health-records.component.html',
  styleUrls: ['./health-records.component.scss'],
})
export class HealthRecordsComponent implements OnInit {
  passedBookings$: Observable<UpcomingBooking[]> | undefined;
  selectedBooking: UpcomingBooking | undefined;
  attendee!: AttendeeType;
  role: number | undefined;

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.authService
      .getUser()
      .subscribe((user) => (this.role = user?.['entityNo']));
    this.loadPassedBookings();
  }

  loadPassedBookings() {
    if (!this.role) return;
    this.passedBookings$ = this.bookingService
      .getBookingForEntity(this.role, undefined, new Date().toISOString())
      .pipe(
        map((bookings) =>
          flattenBookings(bookings)
            .filter((element) => element.status == Status.CONFIRMED)
            .sort(
              (a, b) =>
                Number(new Date(a.startTime)) - Number(new Date(b.startTime))
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
                  (attendee) => attendee.attendeeType == AttendeeType.PROVIDER
                )?.entityNo;
                return {
                  ...booking,
                  practiceName: doctors.find(
                    (doctor) => doctor.entityNo == doctorsEntity
                  )?.practiceName,
                };
              });
            })
          );
        })
      );
  }
  getSingleBooking(booking: Booking) {
    this.selectedBooking = booking;
  }
}
