import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { Booking, StatusChange, UpcomingBooking } from 'src/app/models';
import { User } from 'src/app/models/user.model';
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
  showCard = false;
  loggedInUserDetails: User | undefined;

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.getLoggedInUserDetails();
    this.loadUpcomingBookings();
  }

  getLoggedInUserDetails(): void {
    this.store
      .select(getLoggedInUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loggedInUser) => {
        if (loggedInUser) {
          this.loggedInUserDetails = loggedInUser;
        }
      });
  }

  loadUpcomingBookings(): void {
    if (this.loggedInUserDetails) {
      this.store.dispatch(
        UpcomingConsultationsActions.loadUpcomingBookings({
          entityNo: this.loggedInUserDetails.sub,
          role: this.loggedInUserDetails.role,
        })
      );
    }
  }

  getSingleBooking(booking: Booking): void {
    this.selectedBooking = booking;
  }

  onStatusChange({ status, id }: StatusChange): void {
    this.loggedInUserDetails?.sub &&
      this.store.dispatch(
        UpcomingConsultationsActions.cancelSelectedUpcomingBooking({
          entityNo: this.loggedInUserDetails.sub,
          role: this.loggedInUserDetails.role,
          id,
          status,
        })
      );
    this.selectedBooking = undefined;
  }
}
