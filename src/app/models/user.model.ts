export interface User {
  firstName: string;
  lastName: string;
  entityNo: number;
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
  Doctor = 1100000222,
}
