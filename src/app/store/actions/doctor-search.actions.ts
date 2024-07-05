import { createAction, props } from '@ngrx/store';
import { Doctor } from 'src/app/models';

export const loadAllDoctors = createAction(
  '[Doctor-search Page] Load all doctors'
);

export const loadAllDoctorsSuccess = createAction(
  '[Doctor-search Page] Load all doctors success',
  props<{ doctors: Doctor[] }>()
);

export const loadAllDoctorsFailure = createAction(
  '[Doctor-search Page] Load all doctors failure'
);

export const loadSingleDoctor = createAction(
  '[Doctor-search Page] Load single doctor',
  props<{ firstName: string; lastName: string }>()
);

export const loadSingleDoctorSuccess = createAction(
  '[Doctor-search Page] Load single doctor success',
  props<{ doctor: Doctor[] }>()
);

export const loadSingleDoctorFailure = createAction(
  '[Doctor-search Page] Load single doctor failure'
);
