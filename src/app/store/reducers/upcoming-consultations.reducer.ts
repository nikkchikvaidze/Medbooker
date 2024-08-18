import { createReducer, on } from '@ngrx/store';
import {
  initialUpcomingState,
  UpcomingState,
} from '../states/upcoming-consultations.state';
import * as UpcomingConsultationActions from '../actions/upcoming-consultations.actions';
import { CallState } from 'src/app/models';

export const upcomingReducer = createReducer(
  initialUpcomingState,
  on(UpcomingConsultationActions.loadUpcomingBookings, (): UpcomingState => {
    return {
      ...initialUpcomingState,
      callState: CallState.LOADING,
    };
  }),
  on(
    UpcomingConsultationActions.loadUpcomingBookingsSuccess,
    (state, action): UpcomingState => {
      return {
        ...state,
        upcomingBookings: action.bookings,
        callState: CallState.LOADED,
      };
    }
  ),
  on(
    UpcomingConsultationActions.loadUpcomingBookingsNoData,
    (): UpcomingState => {
      return {
        ...initialUpcomingState,
        callState: CallState.NO_DATA,
      };
    }
  ),
  on(
    UpcomingConsultationActions.loadUpcomingBookingsFailure,
    (state): UpcomingState => {
      return {
        ...state,
        upcomingBookings: [],
        callState: CallState.ERROR,
      };
    }
  ),
  on(
    UpcomingConsultationActions.selectedUpcomingBooking,
    (state, action): UpcomingState => {
      return {
        ...state,
        selectedBooking: action.selectedBooking,
      };
    }
  ),
  on(
    UpcomingConsultationActions.clearSelectedUpcommingBooking,
    (state, action) => {
      return {
        ...state,
        selectedBooking: undefined,
      };
    }
  )
);
