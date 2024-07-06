import { Doctor } from 'src/app/models';

export interface SelectedDoctorState {
  selectedDoctor: Doctor | undefined;
}

export const initialSelectedDoctorState: SelectedDoctorState = {
  selectedDoctor: undefined,
};
