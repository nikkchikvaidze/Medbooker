import { Booking } from 'src/app/models';

export interface DoctorDashboardAndRequests {
  bookings: Booking[];
  selectedBooking?: Booking;
}

export const initialDoctorDashboardAndRequestsState: DoctorDashboardAndRequests =
  {
    bookings: [],
  };
