import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { Booking } from 'src/app/models';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';
import { AppState } from '@store/states/app.state';
import * as HealthRecordsSelectors from '@store/selectors/health.selector';
import * as HealthRecordsActions from '@store/actions/health.actions';
import { getLoggedInUserEntityNo } from '@store/selectors/auth.selector';

@Component({
  selector: 'app-health-records',
  templateUrl: './health-records.component.html',
  styleUrls: ['./health-records.component.scss'],
})
export class HealthRecordsComponent extends Unsubscribe implements OnInit {
  passedBookings$: Observable<Booking[]> = this.store.select(
    HealthRecordsSelectors.getPassedBookings
  );
  selectedBooking: Booking | undefined;
  loggedInUserEntityNo: string | undefined;

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.getLoggedInUserDetails();
    this.loadPassedBookings();
  }

  getLoggedInUserDetails(): void {
    this.store
      .select(getLoggedInUserEntityNo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((entityNo) => {
        if (entityNo) {
          this.loggedInUserEntityNo = entityNo;
        }
      });
  }

  loadPassedBookings(): void {
    if (this.loggedInUserEntityNo) {
      this.store.dispatch(
        HealthRecordsActions.loadPassedBookings({
          entityNo: this.loggedInUserEntityNo,
        })
      );
    }
  }

  getSingleBooking(booking: Booking): void {
    this.selectedBooking = booking;
  }
}
