import { Component, OnInit } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs';
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
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss'],
})
export class DoctorDashboardComponent extends Unsubscribe implements OnInit {
  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {
    super();
  }

  bookings: Booking[] | undefined;

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
      .subscribe((bookings) => (this.bookings = bookings));
  }

  // onStatusChange(status: StatusChange): void {
  //   const bookingUpdateBody: BookingStatusUpdateRequest = {
  //     bookingStatus: status.status,
  //     comment: '',
  //     includeDependent: true,
  //   };
  //   this.bookingService
  //     .updateBooking(status.id, bookingUpdateBody)
  //     .subscribe(() => this.loadingBookings());
  // }
}
