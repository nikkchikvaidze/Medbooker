import { createAction, props } from '@ngrx/store';
import { Booking, Roles, Status } from 'src/app/models';

export const loadUpcomingBookings = createAction(
  '[Upcoming Consultation Page] Load upcoming bookings',
  props<{ entityNo: string; role: Roles }>()
);

export const loadUpcomingBookingsSuccess = createAction(
  '[Upcoming Consultation Page] Load upcoming bookings success',
  props<{ bookings: Booking[] }>()
);

export const loadUpcomingBookingsNoData = createAction(
  '[Upcoming Consultation Page] Load upcoming bookings No Data'
);

export const loadUpcomingBookingsFailure = createAction(
  '[Upcoming Consultation Page] Load upcoming bookings failure'
);

export const selectedUpcomingBooking = createAction(
  '[Upcoming Consultation Page] Get selected upcoming booking',
  props<{ selectedBooking: Booking }>()
);

export const clearSelectedUpcommingBooking = createAction(
  '[Upcoming Consultation Page] clear selected upcoming booking'
);

export const cancelSelectedUpcomingBooking = createAction(
  '[Upcoming Consultation Page] Change status to cancel of selected booking',
  props<{ id: number; status: Status; role: Roles; entityNo: string }>()
);

export const cancelSelectedUpcomingBookingFailure = createAction(
  '[Upcoming Consultation Page] Change status to cancel of selected booking Failure'
);
