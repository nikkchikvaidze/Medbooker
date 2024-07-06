import { Doctor } from 'src/app/models';

export interface DoctorState {
  doctorsList: Doctor[];
  singleDoctor: Doctor[];
}

export const initialDoctorState: DoctorState = {
  doctorsList: [],
  singleDoctor: [],
};
