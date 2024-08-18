import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const getLoggedInUser = createAction('[Auth] Get Logged In User');
export const getLoggedInUserSuccess = createAction(
  '[Auth] Get Logged In User Success',
  props<{ user: User | undefined }>()
);
export const getLoggedInUserNoData = createAction(
  '[Auth] Get Logged In User No Data'
);
export const getLoggedInUserFailure = createAction(
  '[Auth] Get Logged In User Failure'
);

export const clearLoggedInUser = createAction('[Auth] Clear Logged In User');
