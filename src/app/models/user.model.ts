export interface User {
  firstName: string;
  lastName: string;
  role: Roles;
  specialty?: string;
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
