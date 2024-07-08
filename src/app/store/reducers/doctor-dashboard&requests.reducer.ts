import { createReducer, on } from '@ngrx/store';
import {
  DoctorDashboardAndRequests,
  initialDoctorDashboardAndRequestsState,
} from '../states/doctor-dashboard&requests.state';
import * as DoctorDashboardAndRequestsActions from '../actions/doctor-dashboard&requests.actions';

export const doctorDashboardAndRequestsPageReducer = createReducer(
  initialDoctorDashboardAndRequestsState,
  on(
    DoctorDashboardAndRequestsActions.loadPassedBookingsSuccess,
    (state, action): DoctorDashboardAndRequests => {
      return {
        ...state,
        bookings: action.bookings,
      };
    }
  ),
  on(
    DoctorDashboardAndRequestsActions.loadPassedBookingsFailure,
    (state, action): DoctorDashboardAndRequests => {
      return {
        ...state,
        bookings: [],
      };
    }
  )
);
