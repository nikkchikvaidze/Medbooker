import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { DoctorService } from 'src/app/services';
import * as DoctorsActions from '../actions/doctor-search.actions';

@Injectable({ providedIn: 'root' })
export class DoctorsEffects {
  constructor(
    private actions$: Actions,
    private doctorService: DoctorService
  ) {}

  getAllDoctors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DoctorsActions.loadAllDoctors),
      mergeMap(() => {
        return this.doctorService.getAllDoctors();
      }),
      map((doctors) => DoctorsActions.loadAllDoctorsSuccess({ doctors })),
      catchError(() => of(DoctorsActions.loadAllDoctorsFailure))
    );
  });

  getSingleDoctor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DoctorsActions.loadSingleDoctor),
      mergeMap((action) => {
        return this.doctorService.searchForDoctor(
          action.firstName,
          action.lastName
        );
      }),
      map((doctor) => DoctorsActions.loadSingleDoctorSuccess({ doctor })),
      catchError(() => of(DoctorsActions.loadSingleDoctorFailure))
    );
  });
}
