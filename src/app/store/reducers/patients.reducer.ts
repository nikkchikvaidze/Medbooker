import { createReducer, on } from '@ngrx/store';
import { initialPatientState, PatientsState } from '../states/patients.state';
import * as PatientsActions from '../actions/patients.actions';

export const patientsReducer = createReducer(
  initialPatientState,
  on(PatientsActions.loadAllPatientsSuccess, (state, action): PatientsState => {
    return {
      ...state,
      patientsList: action.patients,
    };
  }),
  on(PatientsActions.loadAllPatientsFailure, (state): PatientsState => {
    return {
      ...state,
      patientsList: [],
    };
  }),
  on(
    PatientsActions.loadSinglePatientSuccess,
    (state, action): PatientsState => {
      return {
        ...state,
        singlePatient: action.patient,
      };
    }
  ),
  on(PatientsActions.loadSinglePatientFailure, (state): PatientsState => {
    return {
      ...state,
      singlePatient: [],
    };
  }),
  on(PatientsActions.createBookingForPatient, (state): PatientsState => {
    return {
      ...state,
    };
  })
);
