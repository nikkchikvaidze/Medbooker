import { createAction, props } from '@ngrx/store';
import { Booking, Roles, Status } from 'src/app/models';

export const loadDashboardAndRequestsBookings = createAction(
  '[DocDashboard&Requests] Get Bookings',
  props<{ entityNo: string; role: Roles }>()
);

export const loadDashboardAndRequestsBookingsSuccess = createAction(
  '[DocDashboard&Requests] Get Bookings Success',
  props<{ booking: Booking[] }>()
);

export const loadDashboardAndRequestsBookingsNoData = createAction(
  '[DocDashboard&Requests] Get Bookings No Data'
);

export const loadDashboardAndRequestsBookingsFailure = createAction(
  '[DocDashboard&Requests] Get Bookings Failure'
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
