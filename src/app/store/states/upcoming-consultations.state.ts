import { Booking, CallState } from 'src/app/models';

export interface UpcomingState {
  upcomingBookings: Booking[];
  callState: CallState;
  selectedBooking: Booking | undefined;
}

export const initialUpcomingState: UpcomingState = {
  upcomingBookings: [],
  callState: CallState.INIT,
  selectedBooking: undefined,
};
