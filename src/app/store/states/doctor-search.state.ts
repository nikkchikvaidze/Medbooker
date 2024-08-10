import { CallState, Doctor } from 'src/app/models';

export interface DoctorState {
  doctorsList: Doctor[];
  singleDoctor: Doctor[];
  callState: CallState;
}

export const initialDoctorState: DoctorState = {
  doctorsList: [],
  singleDoctor: [],
  callState: CallState.INIT,
};
