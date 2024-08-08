import { Doctor } from './doctor.model';
import { Patient } from './patient.model';
import { Roles } from './user.model';

export interface Booking {
  startTime: string;
  endTime: string;
  id: number;
  description?: string;
  organiser: Roles;
  status: Status;
  statusComment?: string;
  title?: string;
  doctorEntityNum: number;
  patientEntityNum: number;
  doctor: Doctor;
  patient: Patient;
}

// export interface BookingRequest {
//   attendees: Attendee[];
//   description?: string;
//   endDate: string;
//   id: number;
//   organiser: number;
//   startDate: string;
//   title?: string;
// }

export interface BookingRequest {
  description?: string;
  organiser: number;
  title?: string;
  startTime: string;
  endTime: string;
  doctorEntityNo: string;
  patientEntityNo: string;
  status: Status;
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
  entityNo: number | undefined;
}

export enum AttendeeType {
  PATIENT = 'PATIENT',
  PROVIDER = 'PROVIDER',
}

export enum Status {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED',
}
