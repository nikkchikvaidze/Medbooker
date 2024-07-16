import { createAction, props } from '@ngrx/store';
import { Booking, Status } from 'src/app/models';

export const loadDashboardAndRequestsBookings = createAction(
  '[DocDashboard&Requests] Get bookings',
  props<{ entityNo: number }>()
);

export const loadPassedBookingsSuccess = createAction(
  '[DocDashboard&Requests] Get bookings success',
  props<{ bookings: Booking[] }>()
);

export const loadPassedBookingsFailure = createAction(
  '[DocDashboard&Requests] Get bookings failure'
);

export const changeStatusForSelectedBooking = createAction(
  '[DocDashboard&Requests] Change status of selected booking',
  props<{ id: number; entityNo: number; status: Status }>()
);
