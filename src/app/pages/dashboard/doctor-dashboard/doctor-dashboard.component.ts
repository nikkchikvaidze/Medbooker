import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { Booking, Roles } from 'src/app/models';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';
import { AppState } from 'src/app/store/states/app.state';
import * as AuthSelectors from '../../../store/selectors/auth.selector';
import * as DocDashboardActions from '../../../store/actions/doctor-dashboard&requests.actions';
import * as DocDashboardSelectors from '../../../store/selectors/doctor-dashboard&requests.selector';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss'],
})
export class DoctorDashboardComponent extends Unsubscribe implements OnInit {
  constructor(private store: Store<AppState>) {
    super();
  }

  bookings$: Observable<Booking[]> = this.store.select(
    DocDashboardSelectors.getDocDashboardAndRequestsBookings
  );
  loggedInUserEntityNo: string = '';

  ngOnInit(): void {
    this.getLoggedInUserEntityNo();
    this.loadingBookings();
  }

  loadingBookings(): void {
    if (this.loggedInUserEntityNo) {
      this.store.dispatch(
        DocDashboardActions.loadDashboardAndRequestsBookings({
          entityNo: this.loggedInUserEntityNo,
          role: Roles.Doctor,
        })
      );
    }
  }

  getLoggedInUserEntityNo(): void {
    this.store
      .select(AuthSelectors.getLoggedInUserEntityNo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((entityNo) => {
        if (entityNo) {
          this.loggedInUserEntityNo = entityNo;
        }
      });
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
