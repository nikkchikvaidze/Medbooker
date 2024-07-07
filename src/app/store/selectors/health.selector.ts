import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

const selectHealthPageState = (state: AppState) => state.healthPage;

export const getPassedBookings = createSelector(
  selectHealthPageState,
  (state) => state.pastBookings
);

export const getSelectedBooking = createSelector(
  selectHealthPageState,
  (state) => state.selectedBooking
);
