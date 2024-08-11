import { Specialty } from './specialty.model';

export interface UserRequest {
  firstName: string;
  lastName: string;
  role: Roles;
  specialty?: Specialty;
}

export interface User extends UserRequest {
  sub: string;
  email: string;
  email_verified: string;
  phone_verified: string;
}

export interface SupabaseUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
export enum Roles {
  Patient = 1000000001,
  Doctor = 1000000002,
}
