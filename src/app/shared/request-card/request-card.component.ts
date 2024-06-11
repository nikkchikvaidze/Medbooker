import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttendeeType, Booking, Status } from 'src/app/models';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss'],
})
export class RequestCardComponent implements OnInit {
  @Input() booking: Booking | undefined;
  @Output() statusChange = new EventEmitter();
  attendeeType = AttendeeType;
  status = Status;

  constructor() {}

  ngOnInit(): void {}

  changeStatus(status: Status, id: number) {
    this.statusChange.emit({
      status,
      id,
    });
  }
}
