import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { Booking, Roles, StatusChange } from 'src/app/models';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';
import { AppState } from 'src/app/store/states/app.state';
import * as RequestsSelectors from '../../store/selectors/doctor-dashboard&requests.selector';
import * as RequestActions from '../../store/actions/doctor-dashboard&requests.actions';
import * as AuthSelectors from '../../store/selectors/auth.selector';

@Component({
  selector: 'app-consultation-requests',
  templateUrl: './consultation-requests.component.html',
  styleUrls: ['./consultation-requests.component.scss'],
})
export class ConsultationRequestsComponent
  extends Unsubscribe
  implements OnInit
{
  bookings$: Observable<Booking[] | undefined> = this.store.select(
    RequestsSelectors.getDocDashboardAndRequestsBookings
  );

  loggedInUserEntityNo: string = '';

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.getLoggedInUserEntityNo();
    this.loadBookings();
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

  loadBookings(): void {
    if (this.loggedInUserEntityNo) {
      this.store.dispatch(
        RequestActions.loadDashboardAndRequestsBookings({
          entityNo: this.loggedInUserEntityNo,
          role: Roles.Doctor,
        })
      );
    }
  }

  onStatusChange({ status, id }: StatusChange): void {
    this.store.dispatch(
      RequestActions.changeStatusForSelectedBooking({
        id,
        status,
        role: Roles.Doctor,
        entityNo: this.loggedInUserEntityNo,
      })
    );
  }
}
