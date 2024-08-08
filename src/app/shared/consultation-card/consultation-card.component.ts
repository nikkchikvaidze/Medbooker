import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttendeeType, Booking } from 'src/app/models';
import { Roles } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-consultation-card',
  templateUrl: './consultation-card.component.html',
  styleUrls: ['./consultation-card.component.scss'],
})
export class ConsultationCardComponent implements OnInit {
  @Input() booking: Booking | undefined;
  @Output() chosenBooking = new EventEmitter();
  attendee = AttendeeType;
  role = Roles;
  loggedInUserRole: Roles | undefined;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.loggedInUserRole = user?.['role'];
    });
  }
  getBooking(booking: Booking) {
    this.chosenBooking.emit(booking);
  }
}
