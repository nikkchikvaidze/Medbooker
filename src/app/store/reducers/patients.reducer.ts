import { createReducer, on } from '@ngrx/store';
import { initialPatientState, PatientsState } from '../states/patients.state';
import * as PatientsActions from '../actions/patients.actions';
import { CallState } from 'src/app/models';

export const patientsReducer = createReducer(
  initialPatientState,
  on(PatientsActions.loadAllPatients, (): PatientsState => {
    return {
      ...initialPatientState,
      callState: CallState.LOADING,
    };
  }),
  on(PatientsActions.loadAllPatientsSuccess, (state, action): PatientsState => {
    return {
      ...state,
      patientsList: action.patients,
      callState: CallState.LOADED,
    };
  }),
  on(PatientsActions.loadAllPatientsNoData, (state): PatientsState => {
    return {
      ...state,
      patientsList: [],
      callState: CallState.NO_DATA,
    };
  }),
  on(PatientsActions.loadAllPatientsFailure, (state): PatientsState => {
    return {
      ...state,
      patientsList: [],
      callState: CallState.ERROR,
    };
  }),
  on(PatientsActions.searchForPatient, (state): PatientsState => {
    return {
      ...state,
      singlePatient: [],
      callState: CallState.LOADING,
    };
  }),
  on(
    PatientsActions.searchForPatientSuccess,
    (state, action): PatientsState => {
      return {
        ...state,
        singlePatient: action.patient,
        callState: CallState.LOADED,
      };
    }
  ),
  on(PatientsActions.searchForPatientNoData, (state): PatientsState => {
    return {
      ...state,
      singlePatient: [],
      callState: CallState.NO_DATA,
    };
  }),
  on(PatientsActions.searchForPatientFailure, (state): PatientsState => {
    return {
      ...state,
      singlePatient: [],
      callState: CallState.ERROR,
    };
  }),
  on(PatientsActions.createBookingForPatient, (state): PatientsState => {
    return {
      ...state,
    };
  })
);
