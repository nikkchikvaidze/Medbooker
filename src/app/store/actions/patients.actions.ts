import { createAction, props } from '@ngrx/store';
import { Patient, User } from 'src/app/models';

export const loadAllPatients = createAction(
  '[Patients Page] Load all patients'
);

export const loadAllPatientsSuccess = createAction(
  '[Patients Page] Load all patients success',
  props<{ patients: Patient[] }>()
);

export const loadAllPatientsFailure = createAction(
  '[Patients Page] Load all patients failure'
);

export const loadSinglePatient = createAction(
  '[Patients Page] Load single patient',
  props<{ firstName: string; lastName: string }>()
);

export const loadSinglePatientSuccess = createAction(
  '[Patients Page] Load single patient success',
  props<{ patient: Patient[] }>()
);

export const loadSinglePatientFailure = createAction(
  '[Patients Page] Load single patient failure'
);

export const createBookingForPatient = createAction(
  '[Patients Page] Create booking for patient',
  props<{ selectedPatient: Patient; currentUser: User; pickedTime: Date }>()
);

export const createBookingForPatientSuccess = createAction(
  '[Patients Page] Create booking for patient success'
);

export const createBookingForPatientFailure = createAction(
  '[Patients Page] Create booking for patient failure'
);
