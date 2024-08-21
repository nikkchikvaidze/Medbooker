import { Booking, CallState } from 'src/app/models';

export interface HealthState {
  pastBookings: Booking[];
  callState: CallState;
  selectedBooking: Booking | undefined;
}

export const initialHealthState: HealthState = {
  pastBookings: [],
  callState: CallState.INIT,
  selectedBooking: undefined,
};
