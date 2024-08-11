import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

const selectDoctorBookPage = (state: AppState) => state.auth;

export const getLoggedInUser = createSelector(
  selectDoctorBookPage,
  (state) => state.loggedInUser
);
