import { Booking, CallState } from 'src/app/models';

export interface DoctorDashboardAndRequests {
  bookings: Booking[];
  selectedBooking?: Booking;
  callState: CallState;
}

export const initialDoctorDashboardAndRequestsState: DoctorDashboardAndRequests =
  {
    bookings: [],
    callState: CallState.INIT,
  };
