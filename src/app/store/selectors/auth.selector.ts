import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

const selectAuth = (state: AppState) => state.auth;

export const getLoggedInUser = createSelector(
  selectAuth,
  (state) => state.loggedInUser
);

export const getLoggedInUserEntityNo = createSelector(
  selectAuth,
  (state) => state.loggedInUser?.sub
);

export const getLoggedInUserRole = createSelector(
  selectAuth,
  (state) => state.loggedInUser?.role
);
