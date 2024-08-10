import { createReducer, on } from '@ngrx/store';
import {
  initialSelectedDoctorState,
  SelectedDoctorState,
} from '../states/doctor-book.state';
import * as DoctorBookActions from '../actions/doctor-book.actions';
import { CallState } from 'src/app/models';

export const doctorBookReducer = createReducer(
  initialSelectedDoctorState,
  on(DoctorBookActions.loadSingleDoctorBook, (): SelectedDoctorState => {
    return {
      ...initialSelectedDoctorState,
      callState: CallState.LOADING,
    };
  }),
  on(
    DoctorBookActions.loadSingleDoctorSuccess,
    (state, action): SelectedDoctorState => {
      return {
        ...state,
        selectedDoctor: action.doctor,
        callState: CallState.LOADED,
      };
    }
  ),
  on(
    DoctorBookActions.loadSingleDoctorFailure,
    (state): SelectedDoctorState => {
      return {
        ...state,
        selectedDoctor: undefined,
        callState: CallState.ERROR,
      };
    }
  ),
  on(DoctorBookActions.createBookingForDoctor, (state): SelectedDoctorState => {
    return {
      ...state,
      callState: CallState.LOADING,
    };
  }),
  on(
    DoctorBookActions.createBookingForDoctorSuccess,
    (state, action): SelectedDoctorState => {
      return {
        ...state,
        createdBooking: action.booking,
        callState: CallState.LOADED,
      };
    }
  ),
  on(
    DoctorBookActions.createBookingForDoctorFailure,
    (state, action): SelectedDoctorState => {
      return {
        ...state,
        createdBooking: undefined,
        callState: CallState.ERROR,
      };
    }
  )
);
