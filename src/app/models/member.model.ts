import { Roles } from './user.model';

export interface Member {
  id?: number;
  entityNo: string;
  firstName: string;
  lastName: string;
  role: Roles;
}
