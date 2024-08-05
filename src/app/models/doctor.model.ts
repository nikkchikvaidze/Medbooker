import { Member } from './member.model';
import { Specialty } from './specialty.model';
import { Roles } from './user.model';

export interface Doctor extends Member {
  specialty: Specialty;
  practiceNo?: string;
  coords?: {
    lat: number;
    lng: number;
  };
}

export interface CreateDoctorRequest {
  firstName: string;
  lastName: string;
  specialty?: Specialty;
  practiceNo?: string;
  role: Roles;
  coords?: {
    lat: number;
    lng: number;
  };
}
