import { Component, OnInit } from '@angular/core';
import { Observable, map, takeUntil } from 'rxjs';
import {
  Booking,
  BookingStatusUpdateRequest,
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
  bookings$: Observable<Booking[]> | undefined;
  entityNo: number | undefined;

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
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.entityNo = user?.['entityNo'];
      });
    if (this.entityNo) {
      this.bookings$ = this.bookingService
        .getBookingForEntity(this.entityNo, new Date().toISOString())
        .pipe(
          map((x) => x.bookingMap),
          map((x) =>
            Object.keys(x)
              .map((key) => x[key])
              .flat()
              .sort(
                (a, b) =>
                  Number(new Date(a.startTime)) - Number(new Date(b.startTime))
              )
          ),
          map((x) => x.filter((x) => x.status === Status.TENTATIVE))
        );
    }
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
