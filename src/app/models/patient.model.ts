import { Member } from './member.model';
import { Roles } from './user.model';

export interface Patient extends Member {}

export interface CreatePatientRequest {
  firstName: string;
  lastName: string;
  entityNo: string;
  role: Roles;
  coords?: {
    lat: number;
    lng: number;
  };
}
