import { createReducer, on } from '@ngrx/store';
import { DoctorState, initialDoctorState } from '../states/doctor-search.state';
import * as DoctorActions from '../actions/doctor-search.actions';
import { CallState } from 'src/app/models';

export const doctorsReducer = createReducer(
  initialDoctorState,
  on(DoctorActions.loadAllDoctors, (): DoctorState => {
    return {
      ...initialDoctorState,
      callState: CallState.LOADING,
    };
  }),
  on(DoctorActions.loadAllDoctorsSuccess, (state, action): DoctorState => {
    return {
      ...state,
      doctorsList: action.doctors,
      callState: CallState.LOADED,
    };
  }),
  on(DoctorActions.loadAllDoctorsFailure, (state): DoctorState => {
    return {
      ...state,
      doctorsList: [],
      callState: CallState.ERROR,
    };
  }),
  on(DoctorActions.loadAllDoctorsNoData, (state): DoctorState => {
    return {
      ...state,
      doctorsList: [],
      callState: CallState.NO_DATA,
    };
  }),
  on(DoctorActions.loadSingleDoctor, (state, action): DoctorState => {
    return {
      ...state,
      callState: CallState.LOADING,
    };
  }),
  on(DoctorActions.loadSingleDoctorSuccess, (state, action): DoctorState => {
    return {
      ...state,
      singleDoctor: action.doctor,
      callState: CallState.LOADED,
    };
  }),
  on(DoctorActions.loadSingleDoctorFailure, (state): DoctorState => {
    return {
      ...state,
      singleDoctor: [],
      callState: CallState.ERROR,
    };
  }),
  on(DoctorActions.loadSingleDoctorNoData, (state): DoctorState => {
    return {
      ...state,
      singleDoctor: [],
      callState: CallState.NO_DATA,
    };
  }),
  on(DoctorActions.clearSingleDoctor, (state): DoctorState => {
    return {
      ...state,
      singleDoctor: [],
    };
  })
);
