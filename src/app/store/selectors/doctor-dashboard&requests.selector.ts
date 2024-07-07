import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

const selectDocDashboardAndRequestsPage = (state: AppState) =>
  state.doctorDashboardAndRequestsPage;

export const getDocDashboardAndRequestsBookings = createSelector(
  selectDocDashboardAndRequestsPage,
  (state) => state.bookings
);
