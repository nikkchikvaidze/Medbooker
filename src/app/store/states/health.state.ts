import { Booking } from 'src/app/models';

export interface HealthState {
  pastBookings: Booking[];
  selectedBooking: Booking | undefined;
}

export const initialHealthState: HealthState = {
  pastBookings: [],
  selectedBooking: undefined,
};
