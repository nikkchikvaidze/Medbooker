import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, filter, map, of, switchMap, takeUntil, tap } from 'rxjs';
import {
  AttendeeType,
  Booking,
  BookingStatusUpdateRequest,
  Status,
  StatusChange,
  UpcomingBooking,
} from 'src/app/models';
import { Roles, User } from 'src/app/models/user.model';
import { AuthService, BookingService, DoctorService } from 'src/app/services';
import { flattenBookings } from 'src/app/shared/utils/helpers.fn';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';
import { AppState } from 'src/app/store/states/app.state';
import * as UpcomingConsultationsActions from '../../store/actions/upcoming-consultations.actions';
import * as UpcomingConsultationSelectors from '../../store/selectors/upcoming-consultations.selector';
import { getLoggedInUser } from '../../store/selectors/auth.selector';

@Component({
  selector: 'app-upcoming-consultations',
  templateUrl: './upcoming-consultations.component.html',
  styleUrls: ['./upcoming-consultations.component.scss'],
})
export class UpcomingConsultationsComponent
  extends Unsubscribe
  implements OnInit
{
  upcomingBookings$: Observable<Booking[]> = this.store.select(
    UpcomingConsultationSelectors.getUpcomingConsultationBookings
  );
  selectedBooking: UpcomingBooking | undefined;
  attendee!: AttendeeType;
  role!: Roles;
  showCard = false;

  constructor(
    private bookingService: BookingService,
    private doctorService: DoctorService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadUpcomingBookings();
  }

  loadUpcomingBookings(): void {
    this.store
      .select(getLoggedInUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loggedInUser) => {
        if (loggedInUser?.sub && loggedInUser?.role) {
          this.store.dispatch(
            UpcomingConsultationsActions.loadUpcomingBookings({
              entityNo: loggedInUser.sub,
              role: loggedInUser.role,
            })
          );
        }
      });
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
    // this.bookingService
    //   .updateBooking(status.id, bookingUpdateBody)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(() => {
    //     this.loadUpcomingBookings();
    //     this.selectedBooking = undefined;
    //   });
  }
}
