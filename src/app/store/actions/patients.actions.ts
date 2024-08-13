import { createAction, props } from '@ngrx/store';
import { BookingRequest, Patient } from 'src/app/models';

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

export const loadAllPatientsNoData = createAction(
  '[Patients Page] Load all patients no data'
);

export const searchForPatient = createAction(
  '[Patients Page] Load single patient',
  props<{ firstName: string | undefined; lastName: string | undefined }>()
);

export const searchForPatientSuccess = createAction(
  '[Patients Page] Load single patient success',
  props<{ patient: Patient[] }>()
);

export const searchForPatientFailure = createAction(
  '[Patients Page] Load single patient failure'
);

export const searchForPatientNoData = createAction(
  '[Patients Page] Load single patient no data'
);

export const createBookingForPatient = createAction(
  '[Patients Page] Create booking for patient',
  props<{ appointment: BookingRequest }>()
);

export const createBookingForPatientSuccess = createAction(
  '[Patients Page] Create booking for patient success'
);

export const createBookingForPatientFailure = createAction(
  '[Patients Page] Create booking for patient failure'
);
