import { Patient } from './patient.model';

export interface Doctor extends Patient {
  specialty?: string | undefined;
  practiceNo?: string;
  coords: {
    lat: number;
    lng: number;
  };
}

export interface CreateDoctorRequest {
  firstName: string;
  lastName: string;
  specialty?: string | undefined;
  practiceNo?: string;
  coords?: {
    lat: number;
    lng: number;
  };
}
