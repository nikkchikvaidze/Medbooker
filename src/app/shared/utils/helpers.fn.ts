import { Booking, BookingResponse } from 'src/app/models';
export function flattenBookings(bookings: BookingResponse): Booking[] {
  return Object.values(bookings.bookingMap).flat();
}
