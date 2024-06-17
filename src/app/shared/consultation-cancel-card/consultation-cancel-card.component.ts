import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttendeeType, Booking, Status } from 'src/app/models';
import { Roles } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-consultation-cancel-card',
  templateUrl: './consultation-cancel-card.component.html',
  styleUrls: ['./consultation-cancel-card.component.scss'],
})
export class ConsultationCancelCardComponent implements OnInit {
  @Input() selectedBooking: Booking | undefined;
  @Input() practiceName: string | undefined;
  @Output() statusChange = new EventEmitter();
  attendee = AttendeeType;
  role = Roles;
  entity: number | undefined;
  status = Status;
  showCard = true;
  cancelButton: boolean | undefined;
  consultationTitle: string | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .getUser()
      .subscribe(
        (user) => (this.entity = user?.data.user?.user_metadata['entityNo'])
      );
    this.showButton();
  }

  changeStatus(status: string, id: number) {
    this.statusChange.emit({
      status: status,
      id: id,
    });
    this.showCard = false;
  }

  showButton() {
    if (
      this.selectedBooking &&
      new Date(this.selectedBooking.startTime) > new Date()
    ) {
      this.cancelButton = true;
      this.consultationTitle = 'Upcoming consultations';
    } else {
      this.cancelButton = false;
      this.consultationTitle = 'Passed consultations';
    }
  }
}
