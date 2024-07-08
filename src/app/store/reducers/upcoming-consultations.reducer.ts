import { createReducer, on } from '@ngrx/store';
import {
  initialUpcomingState,
  UpcomingState,
} from '../states/upcoming-consultations.state';
import * as UpcomingConsultationActions from '../actions/upcoming-consultations.actions';

export const upcomingReducer = createReducer(
  initialUpcomingState,
  on(
    UpcomingConsultationActions.loadPassedBookingsSuccess,
    (state, action): UpcomingState => {
      return {
        ...state,
        upcomingBookings: action.bookings,
      };
    }
  ),
  on(
    UpcomingConsultationActions.loadPassedBookingsFailure,
    (state, action): UpcomingState => {
      return {
        ...state,
        upcomingBookings: [],
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
