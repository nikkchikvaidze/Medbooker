import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { BookingRequest, Doctor, Patient, Status } from 'src/app/models';
import { Roles } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';
import { AppState } from '@store/states/app.state';
import * as DoctorBookActions from '@store/actions/doctor-book.actions';
import * as DoctorBookSelectors from '@store/selectors/doctor-book.selector';

@Component({
  selector: 'app-doctor-book',
  templateUrl: './doctor-book.component.html',
  styleUrls: ['./doctor-book.component.scss'],
})
export class DoctorBookComponent extends Unsubscribe implements OnInit {
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    super();
  }

  doctor$: Observable<Doctor | undefined> = this.store.select(
    DoctorBookSelectors.getSelectedDoctor
  );
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
    this.getSingleDoctor(currentEntityNo);
  }

  getSingleDoctor(entityNo: string): void {
    this.store.dispatch(DoctorBookActions.loadSingleDoctorBook({ entityNo }));
  }

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
    this.store.dispatch(DoctorBookActions.createBookingForDoctor({ booking }));
    this.route.navigate(['shell/upcoming-consultations']);
  }
}
