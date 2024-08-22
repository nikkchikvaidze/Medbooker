import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Booking } from 'src/app/models';
import { Roles } from 'src/app/models/user.model';
import { AppState } from '@store/states/app.state';
import * as LoggedInUserSelectors from '@store/selectors/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consultation-card',
  templateUrl: './consultation-card.component.html',
  styleUrls: ['./consultation-card.component.scss'],
})
export class ConsultationCardComponent implements OnInit {
  @Input() booking: Booking | undefined;
  @Output() chosenBooking = new EventEmitter();
  role = Roles;
  loggedInUserRole$: Observable<Roles | undefined> = this.store.select(
    LoggedInUserSelectors.getLoggedInUserRole
  );

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
  getBooking(booking: Booking) {
    this.chosenBooking.emit(booking);
  }
}
