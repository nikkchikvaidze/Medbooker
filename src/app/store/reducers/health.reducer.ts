import { createReducer, on } from '@ngrx/store';
import { HealthState, initialHealthState } from '../states/health.state';
import * as HealthActions from '../actions/health.actions';
import { CallState } from 'src/app/models';

export const healthReducer = createReducer(
  initialHealthState,
  on(HealthActions.loadPassedBookings, (): HealthState => {
    return {
      ...initialHealthState,
      callState: CallState.LOADING,
    };
  }),
  on(HealthActions.loadPassedBookingsSuccess, (state, action): HealthState => {
    return {
      ...state,
      callState: CallState.LOADED,
      pastBookings: action.bookings,
    };
  }),
  on(HealthActions.loadPassedBookingsFailure, (state): HealthState => {
    return {
      ...state,
      callState: CallState.ERROR,
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
