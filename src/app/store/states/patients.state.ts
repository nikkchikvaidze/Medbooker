import { Patient } from 'src/app/models';

export interface PatientsState {
  patientsList: Patient[];
  singlePatient: Patient[];
}

export const initialPatientState: PatientsState = {
  patientsList: [],
  singlePatient: [],
};
