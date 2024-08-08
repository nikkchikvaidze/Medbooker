import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, takeUntil } from 'rxjs';
import { BookingRequest, Doctor, Patient, Status } from 'src/app/models';
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
            entityNo: user['sub'],
            firstName: user['firstName'],
            lastName: user['lastName'],
            role: user['role'],
          };
          this.currentUser = userInfo;
        }
      });
    let currentEntityNo = this.activatedRoute.snapshot.paramMap.get(
      'id'
    ) as string;
    this.doctor$ = this.doctorService
      .getSingleDoctor(currentEntityNo)
      .pipe(map((value) => value));
  }

  // TODO: This needs some adjustments
  bookDoctor(doctor: Doctor): void {
    if (!this.pickedTime) return;
    let startDate = new Date(this.pickedTime);
    let endDate = new Date(startDate.getTime() + 30 * 60000);
    const booking: BookingRequest = {
      startTime: startDate.toString(),
      description: 'book for doctor',
      title: 'book',
      endTime: endDate.toString(),
      organiser: Roles.Patient,
      doctorEntityNo: doctor.entityNo,
      patientEntityNo: this.currentUser.entityNo,
      status: Status.PENDING,
    };
    this.bookingService
      .createBooking(booking)
      .subscribe((x) => this.route.navigate(['shell/upcoming-consultations']));
  }
}
