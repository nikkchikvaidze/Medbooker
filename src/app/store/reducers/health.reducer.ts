import { createReducer, on } from '@ngrx/store';
import { HealthState, initialHealthState } from '../states/health.state';
import * as HealthActions from '../actions/health.actions';

export const healthReducer = createReducer(
  initialHealthState,
  on(HealthActions.loadPassedBookingsSuccess, (state, action): HealthState => {
    return {
      ...state,
      pastBookings: action.bookings,
    };
  }),
  on(HealthActions.loadPassedBookingsFailure, (state, action): HealthState => {
    return {
      ...state,
      pastBookings: [],
    };
  }),
  on(HealthActions.selectPassedBookings, (state, action): HealthState => {
    return {
      ...state,
      selectedBooking: action.selectedBooking,
    };
  }),
  on(HealthActions.clearSelectPassedBookings, (state, action) => {
    return {
      ...state,
      selectedBooking: undefined,
    };
  })
);
