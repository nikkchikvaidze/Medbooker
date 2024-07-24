import { Roles } from './user.model';

export interface Member {
  id?: number;
  entityNo: number;
  firstName: string;
  lastName: string;
  role: Roles;
}
