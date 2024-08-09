import { createReducer } from '@ngrx/store';
import { initialAuthState } from '../states/auth.state';

export const authReducer = createReducer(initialAuthState);
