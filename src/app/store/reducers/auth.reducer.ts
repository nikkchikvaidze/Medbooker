import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from '../states/auth.state';
import * as AuthActions from '../actions/auth.action';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.getLoggedInUserSuccess, (state, payload): AuthState => {
    return {
      ...state,
      loggedInUser: payload.user,
    };
  }),
  on(AuthActions.getLoggedInUserFailure, (state): AuthState => {
    return {
      ...state,
      loggedInUser: undefined,
    };
  })
);
