import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

const selectPatientsPageState = (state: AppState) => state.patientsPage;

export const getAllPatientsList = createSelector(
  selectPatientsPageState,
  (state) => state.patientsList
);

export const getSinglePatient = createSelector(
  selectPatientsPageState,
  (state) => state.singlePatient
);
