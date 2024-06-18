import { Component, OnInit } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import {
  Booking,
  BookingStatusUpdateRequest,
  Status,
  StatusChange,
} from 'src/app/models';
import { AuthService, BookingService } from 'src/app/services';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss'],
})
export class DoctorDashboardComponent implements OnInit {
  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  bookings$: Observable<Booking[]> | undefined;

  ngOnInit(): void {
    this.loadingBookings();
  }

  loadingBookings() {
    this.bookings$ = this.authService.getUser().pipe(
      switchMap((user) => {
        return this.bookingService
          .getBookingForEntity(user?.['entityNo'], new Date().toISOString())
          .pipe(
            map((x) => x.bookingMap),
            map((x) =>
              Object.keys(x)
                .map((key) => x[key])
                .flat()
            ),
            map((x) =>
              x.filter((x) => x.status === Status.TENTATIVE).splice(0, 5)
            )
          );
      })
    );
  }

  onStatusChange(status: StatusChange) {
    const bookingUpdateBody: BookingStatusUpdateRequest = {
      bookingStatus: status.status,
      comment: '',
      includeDependent: true,
    };
    this.bookingService
      .updateBooking(status.id, bookingUpdateBody)
      .subscribe(() => this.loadingBookings());
  }
}
