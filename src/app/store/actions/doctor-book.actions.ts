import { createAction, props } from '@ngrx/store';
import { Doctor, User } from 'src/app/models';

export const loadSingleDoctorBook = createAction(
  '[Doctor-Book Page] Load single doctor',
  props<{ entityNo: number }>()
);

export const loadSingleDoctorSuccess = createAction(
  '[Doctor-Book Page] Load single doctor success',
  props<{ doctor: Doctor | undefined }>()
);

export const loadSingleDoctorFailure = createAction(
  '[Doctor-Book Page] Load single doctor failure'
);

export const createBookingForDoctor = createAction(
  '[Doctor-Book Page] Create booking for doctor',
  props<{ selectedDoctor: Doctor; currentUser: User; pickedTime: Date }>()
);

export const createBookingForDoctorSuccess = createAction(
  '[Doctor-Book Page] Create booking for doctor success'
);

export const createBookingForDoctorFailure = createAction(
  '[Doctor-Book Page] Create booking for doctor failure'
);
