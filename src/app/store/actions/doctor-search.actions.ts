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

export const loadAllDoctorsNoData = createAction(
  '[Doctor-search Page] Load all doctors no data'
);

export const loadSingleDoctor = createAction(
  '[Doctor-search Page] Load single doctor',
  props<{ firstName: string | undefined; lastName: string | undefined }>()
);

export const loadSingleDoctorSuccess = createAction(
  '[Doctor-search Page] Load single doctor success',
  props<{ doctor: Doctor[] }>()
);

export const loadSingleDoctorFailure = createAction(
  '[Doctor-search Page] Load single doctor failure'
);

export const loadSingleDoctorNoData = createAction(
  '[Doctor-search Page] Load single doctor no data'
);

export const clearSingleDoctor = createAction(
  '[Doctor-search Page] Clear single doctor'
);
