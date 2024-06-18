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
  @Input() fullname: string | undefined;
  @Input() practiceName: string | undefined;
  @Output() chosenBooking = new EventEmitter();
  attendee = AttendeeType;
  role = Roles;
  entity: number | undefined;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.entity = user?.['entityNo'];
    });
  }
  getBooking(booking: Booking) {
    this.chosenBooking.emit(booking);
  }
}
