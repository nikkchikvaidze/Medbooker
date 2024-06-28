import { Component, OnInit } from '@angular/core';
import { Observable, map, of, switchMap, takeUntil } from 'rxjs';
import {
  AttendeeType,
  Booking,
  BookingStatusUpdateRequest,
  Status,
  StatusChange,
  UpcomingBooking,
} from 'src/app/models';
import { Roles } from 'src/app/models/user.model';
import { AuthService, BookingService, DoctorService } from 'src/app/services';
import { flattenBookings } from 'src/app/shared/utils/helpers.fn';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';

@Component({
  selector: 'app-upcoming-consultations',
  templateUrl: './upcoming-consultations.component.html',
  styleUrls: ['./upcoming-consultations.component.scss'],
})
export class UpcomingConsultationsComponent
  extends Unsubscribe
  implements OnInit
{
  upcomingBookings$: Observable<UpcomingBooking[]> | undefined;
  selectedBooking: UpcomingBooking | undefined;
  attendee!: AttendeeType;
  role!: Roles;
  showCard = false;

  constructor(
    private bookingService: BookingService,
    private doctorService: DoctorService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.authService
      .getUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.role = user?.['entityNo'];
      });
    this.loadUpcomingBookings();
  }

  loadUpcomingBookings(): void {
    this.upcomingBookings$ = this.bookingService
      .getBookingForEntity(this.role, new Date().toISOString(), undefined)
      .pipe(
        takeUntil(this.unsubscribe$),
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

  getSingleBooking(booking: Booking): void {
    this.selectedBooking = booking;
  }

  onStatusChange(status: StatusChange): void {
    const bookingUpdateBody: BookingStatusUpdateRequest = {
      bookingStatus: status.status,
      comment: '',
      includeDependent: true,
    };
    this.bookingService
      .updateBooking(status.id, bookingUpdateBody)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.loadUpcomingBookings();
        this.selectedBooking = undefined;
      });
  }
}
