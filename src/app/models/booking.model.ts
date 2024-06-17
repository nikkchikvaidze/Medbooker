import { Patient } from './patient.model';

export interface Booking {
  startTime: string;
  endTime: string;
  id: number;
  description?: string;
  attendees: Attendee[];
  status: Status;
  statusComment?: string;
  title?: string;
}

export interface BookingRequest {
  attendees: Attendee[];
  description?: string;
  endDate: string;
  id: number;
  organiser: number;
  startDate: string;
  title?: string;
}

export interface BookingResponse {
  bookingMap: Record<string, Booking[]>;
  endDate: string;
  startDate: string;
}

export interface BookingStatusUpdateRequest {
  bookingStatus: Status;
  comment?: string;
  includeDependent?: boolean;
}

export type UpcomingBooking = Booking & { practiceName?: string };

export interface StatusChange {
  status: Status;
  id: number;
}

export interface Attendee {
  attendeeType: AttendeeType;
  entity: Patient;
  entityNo: number;
}

export enum AttendeeType {
  PATIENT = 'PATIENT',
  PROVIDER = 'PROVIDER',
}

export enum Status {
  CONFIRMED = 'CONFIRMED',
  TENTATIVE = 'TENTATIVE',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
}
