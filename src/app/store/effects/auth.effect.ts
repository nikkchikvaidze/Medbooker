import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/services';
import * as AuthActions from '../actions/auth.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserMetadata } from '@supabase/supabase-js';
import { User } from 'src/app/models';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  getLoggedInUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.getLoggedInUser),
      mergeMap((_) => {
        return this.authService.getUser();
      }),
      map((userResponse: UserMetadata | undefined) => {
        if (userResponse) {
          const user = userResponse as User;
          return AuthActions.getLoggedInUserSuccess({ user });
        } else {
          return AuthActions.getLoggedInUserNoData();
        }
      }),
      catchError(() => of(AuthActions.getLoggedInUserFailure))
    );
  });
}
