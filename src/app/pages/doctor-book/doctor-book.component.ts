import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, takeUntil } from 'rxjs';
import { AttendeeType, Doctor, Patient } from 'src/app/models';
import { Roles } from 'src/app/models/user.model';
import { AuthService, BookingService, DoctorService } from 'src/app/services';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';

@Component({
  selector: 'app-doctor-book',
  templateUrl: './doctor-book.component.html',
  styleUrls: ['./doctor-book.component.scss'],
})
export class DoctorBookComponent extends Unsubscribe implements OnInit {
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorService,
    private authService: AuthService,
    private bookingService: BookingService
  ) {
    super();
  }

  doctor$: Observable<Doctor> | undefined;
  // TODO: This needs some adjustments
  currentUser!: Patient;
  pickedTime = '';
  get today() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }

  ngOnInit(): void {
    this.authService
      .getUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        if (user) {
          const userInfo = {
            entityNo: user['entityNo'],
            firstName: user['firstName'],
            lastName: user['lastName'],
          };
          this.currentUser = userInfo;
        }
      });
    let currentEntityNo = Number(
      this.activatedRoute.snapshot.paramMap.get('id')
    );
    this.doctor$ = this.doctorService
      .getSingleDoctor(currentEntityNo)
      .pipe(map((value) => value));
  }

  // TODO: This needs some adjustments
  bookDoctor(doctor: Doctor): void {
    if (!this.pickedTime) return;
    let startDate = new Date(this.pickedTime);
    let endDate = new Date(startDate.getTime() + 30 * 60000);
    const booking = {
      attendees: [
        {
          attendeeType: AttendeeType.PATIENT,
          entity: {
            entityNo: this.currentUser.entityNo,
            firstName: this.currentUser.firstName,
            lastName: this.currentUser.lastName,
          },
          entityNo: Roles.Patient,
        },
        {
          attendeeType: AttendeeType.PROVIDER,
          entity: {
            entityNo: doctor.entityNo,
            firstName: doctor.firstName,
            lastName: doctor.lastName,
          },
          entityNo: doctor.entityNo,
        },
      ],
      startDate: startDate.toISOString(),
      description: 'book for doctor',
      title: 'book',
      endDate: endDate.toISOString(),
      id: 0,
      organiser: Roles.Patient,
    };
    //TODO:
    // this.bookingService
    //   .createBooking(booking)
    //   .subscribe(() => this.route.navigate(['shell/upcoming-consultations']));
  }
}
