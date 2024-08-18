import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

const selectUpcomingPageState = (state: AppState) =>
  state.upcomingConsultationsPage;

export const getUpcomingConsultationBookings = createSelector(
  selectUpcomingPageState,
  (state) => state.upcomingBookings
);

export const getSelectedUpcomingBooking = createSelector(
  selectUpcomingPageState,
  (state) => state.selectedBooking
);

export const getUpcomingConsultationState = createSelector(
  selectUpcomingPageState,
  (state) => state.callState
);
