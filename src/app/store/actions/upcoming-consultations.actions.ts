import { createAction, props } from '@ngrx/store';
import { Booking } from 'src/app/models';

export const loadUpcomingBookings = createAction(
  '[Upcoming Consultation Page] Load upcoming bookings',
  props<{ entityNo: number }>()
);

export const loadPassedBookingsSuccess = createAction(
  '[Upcoming Consultation Page] Load upcoming bookings success',
  props<{ bookings: Booking[] }>()
);

export const loadPassedBookingsFailure = createAction(
  '[Upcoming Consultation Page] Load upcoming bookings failure'
);

export const cancelSelectedUpcomingBooking = createAction(
  '[Upcoming Consultation Page] Change status to cancel of selected booking',
  props<{ id: number; entityNo: number }>()
);

export const selectedUpcomingBooking = createAction(
  '[Upcoming Consultation Page] Get selected upcoming booking',
  props<{ selectedBooking: Booking }>()
);

export const clearSelectedUpcommingBooking = createAction(
  '[Upcoming Consultation Page] clear selected upcoming booking'
);
