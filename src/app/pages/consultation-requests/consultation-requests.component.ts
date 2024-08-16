import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Booking, Status, StatusChange } from 'src/app/models';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';
import { AppState } from 'src/app/store/states/app.state';
import * as RequestsSelectors from '../../store/selectors/doctor-dashboard&requests.selector';
import * as RequestActions from '../../store/actions/doctor-dashboard&requests.actions';

@Component({
  selector: 'app-consultation-requests',
  templateUrl: './consultation-requests.component.html',
  styleUrls: ['./consultation-requests.component.scss'],
})
export class ConsultationRequestsComponent
  extends Unsubscribe
  implements OnInit
{
  bookings$: Observable<Booking[] | undefined> = this.store
    .select(RequestsSelectors.getDocDashboardAndRequestsBookings)
    .pipe(
      map((bookings) =>
        bookings.filter((booking) => booking.status === Status.PENDING)
      )
    );

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    // this.loadingBookings();
  }

  onStatusChange({ status, id }: StatusChange): void {
    this.store.dispatch(
      RequestActions.changeStatusForSelectedBooking({ id, status })
    );
    // const bookingUpdateBody: BookingStatusUpdateRequest = {
    //   bookingStatus: status,
    //   comment: '',
    //   includeDependent: true,
    // };
    // this.bookingService
    //   .updateBooking(id, status)
    //   .subscribe((_) => this.loadingBookings());
  }
}
