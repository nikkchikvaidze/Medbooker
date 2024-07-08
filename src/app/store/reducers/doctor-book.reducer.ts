import { createReducer, on } from '@ngrx/store';
import {
  initialSelectedDoctorState,
  SelectedDoctorState,
} from '../states/doctor-book.state';
import * as DoctorBookActions from '../actions/doctor-book.actions';

export const doctorBookReducer = createReducer(
  initialSelectedDoctorState,
  on(
    DoctorBookActions.loadSingleDoctorSuccess,
    (state, action): SelectedDoctorState => {
      return {
        ...state,
        selectedDoctor: action.doctor,
      };
    }
  ),
  on(
    DoctorBookActions.loadSingleDoctorFailure,
    (state): SelectedDoctorState => {
      return {
        ...state,
        selectedDoctor: undefined,
      };
    }
  )
);
