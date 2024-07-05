import { createAction, props } from '@ngrx/store';
import { Booking } from 'src/app/models';

export const loadPassedBookings = createAction(
  '[HealthPage] Get passed bookings',
  props<{ entityNo: number }>()
);

export const loadPassedBookingsSuccess = createAction(
  '[HealthPage] Get passed bookings success',
  props<{ bookings: Booking[] }>()
);

export const loadPassedBookingsFailure = createAction(
  '[HealthPage] Get passed bookings failure'
);

export const selectPassedBookings = createAction(
  '[HealthPage] Get passed selected bookings',
  props<{ selectedBooking: Booking }>()
);

export const clearSelectPassedBookings = createAction(
  '[HealthPage] clear passed selected booking'
);
