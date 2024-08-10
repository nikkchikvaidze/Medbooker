import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { DoctorService } from 'src/app/services';
import * as DoctorsActions from '../actions/doctor-search.actions';
import { Doctor } from 'src/app/models';

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
      map((doctors: Doctor[]) => {
        if (doctors.length < 1) {
          return DoctorsActions.loadAllDoctorsNoData;
        }
        return DoctorsActions.loadAllDoctorsSuccess({ doctors });
      }),
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
      map((doctor: Doctor[]) => {
        if (doctor.length < 1) {
          return DoctorsActions.loadSingleDoctorNoData;
        }
        return DoctorsActions.loadSingleDoctorSuccess({ doctor });
      }),
      catchError(() => of(DoctorsActions.loadSingleDoctorFailure))
    );
  });
}
