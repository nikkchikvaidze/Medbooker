import { Booking } from 'src/app/models';

export interface UpcomingState {
  upcomingBookings: Booking[];
  selectedBooking: Booking | undefined;
}

export const initialUpcomingState: UpcomingState = {
  upcomingBookings: [],
  selectedBooking: undefined,
};
