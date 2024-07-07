import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

const selectDoctorBookPage = (state: AppState) => state.doctorBookPage;

export const getSelectedDoctor = createSelector(
  selectDoctorBookPage,
  (state) => state.selectedDoctor
);
