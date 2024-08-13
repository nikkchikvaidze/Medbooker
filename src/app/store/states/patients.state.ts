import { CallState, Patient } from 'src/app/models';

export interface PatientsState {
  patientsList: Patient[];
  singlePatient: Patient[];
  callState: CallState;
}

export const initialPatientState: PatientsState = {
  patientsList: [],
  singlePatient: [],
  callState: CallState.INIT,
};
