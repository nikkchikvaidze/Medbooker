import { User } from '../../models/user.model';

export interface AuthState {
  loggedInUser: User | undefined;
}

export const initialAuthState: AuthState = {
  loggedInUser: undefined,
};
