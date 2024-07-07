import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

const selectDoctorsPageState = (state: AppState) => state.doctorSearchPage;

export const getAllDoctorsList = createSelector(
  selectDoctorsPageState,
  (state) => state.doctorsList
);

export const getSingleDoctor = createSelector(
  selectDoctorsPageState,
  (state) => state.singleDoctor
);
