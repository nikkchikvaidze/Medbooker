import { createReducer, on } from '@ngrx/store';
import {
  DoctorDashboardAndRequests,
  initialDoctorDashboardAndRequestsState,
} from '../states/doctor-dashboard&requests.state';
import * as DoctorDashboardAndRequestsActions from '../actions/doctor-dashboard&requests.actions';
import { CallState } from 'src/app/models';

export const doctorDashboardAndRequestsPageReducer = createReducer(
  initialDoctorDashboardAndRequestsState,
  on(
    DoctorDashboardAndRequestsActions.loadDashboardAndRequestsBookings,
    (): DoctorDashboardAndRequests => {
      return {
        ...initialDoctorDashboardAndRequestsState,
        callState: CallState.LOADING,
      };
    }
  ),
  on(
    DoctorDashboardAndRequestsActions.loadDashboardAndRequestsBookingsSuccess,
    (state, action): DoctorDashboardAndRequests => {
      return {
        ...state,
        bookings: action.booking,
        callState: CallState.LOADED,
      };
    }
  ),
  on(
    DoctorDashboardAndRequestsActions.loadDashboardAndRequestsBookingsNoData,
    (): DoctorDashboardAndRequests => {
      return {
        ...initialDoctorDashboardAndRequestsState,
        callState: CallState.NO_DATA,
      };
    }
  ),
  on(
    DoctorDashboardAndRequestsActions.loadDashboardAndRequestsBookingsFailure,
    (): DoctorDashboardAndRequests => {
      return {
        ...initialDoctorDashboardAndRequestsState,
        callState: CallState.ERROR,
      };
    }
  )
);
