import { createReducer, on } from '@ngrx/store';
import { DoctorState, initialDoctorState } from '../states/doctor-search.state';
import * as DoctorActions from '../actions/doctor-search.actions';

export const doctorsReducer = createReducer(
  initialDoctorState,
  on(DoctorActions.loadAllDoctorsSuccess, (state, action): DoctorState => {
    return {
      ...state,
      doctorsList: action.doctors,
    };
  }),
  on(DoctorActions.loadAllDoctorsFailure, (state): DoctorState => {
    return {
      ...state,
      doctorsList: [],
    };
  }),
  on(DoctorActions.loadSingleDoctorSuccess, (state, action): DoctorState => {
    return {
      ...state,
      singleDoctor: action.doctor,
    };
  }),
  on(DoctorActions.loadSingleDoctorFailure, (state): DoctorState => {
    return {
      ...state,
      singleDoctor: [],
    };
  })
);
