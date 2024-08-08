import { Component, OnInit } from '@angular/core';
import { Observable, map, switchMap, takeUntil, tap } from 'rxjs';
import {
  Booking,
  BookingStatusUpdateRequest,
  Roles,
  Status,
  StatusChange,
} from 'src/app/models';
import { AuthService, BookingService } from 'src/app/services';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';

@Component({
  selector: 'app-consultation-requests',
  templateUrl: './consultation-requests.component.html',
  styleUrls: ['./consultation-requests.component.scss'],
})
export class ConsultationRequestsComponent
  extends Unsubscribe
  implements OnInit
{
  bookings: Booking[] | undefined;
  entityNo: string | undefined;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadingBookings();
  }

  loadingBookings(): void {
    this.authService
      .getUser()
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((user) => {
          return this.bookingService.getBookingsForEntity(
            user?.['sub'],
            Roles.Doctor
          );
        })
      )
      .pipe(
        map((bookings) =>
          bookings?.filter((booking) => booking.status === Status.PENDING)
        )
      )
      .subscribe((bookings) => (this.bookings = bookings));
  }

  onStatusChange({ status, id }: StatusChange): void {
    // const bookingUpdateBody: BookingStatusUpdateRequest = {
    //   bookingStatus: status,
    //   comment: '',
    //   includeDependent: true,
    // };
    this.bookingService
      .updateBooking(id, status)
      .subscribe((_) => this.loadingBookings());
  }
}
