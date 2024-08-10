import { createAction, props } from '@ngrx/store';
import { Booking, BookingRequest, Doctor, User } from 'src/app/models';

export const loadSingleDoctorBook = createAction(
  '[Doctor-Book Page] Load single doctor',
  props<{ entityNo: string }>()
);

export const loadSingleDoctorSuccess = createAction(
  '[Doctor-Book Page] Load single doctor success',
  props<{ doctor: Doctor }>()
);

export const loadSingleDoctorFailure = createAction(
  '[Doctor-Book Page] Load single doctor failure'
);

export const createBookingForDoctor = createAction(
  '[Doctor-Book Page] Create booking for doctor',
  props<{ booking: BookingRequest }>()
);

export const createBookingForDoctorSuccess = createAction(
  '[Doctor-Book Page] Create booking for doctor success',
  props<{ booking: Booking }>()
);

export const createBookingForDoctorFailure = createAction(
  '[Doctor-Book Page] Create booking for doctor failure'
);
