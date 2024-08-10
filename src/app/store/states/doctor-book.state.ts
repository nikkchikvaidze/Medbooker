import { Booking, CallState, Doctor } from 'src/app/models';

export interface SelectedDoctorState {
  selectedDoctor: Doctor | undefined;
  createdBooking: Booking | undefined;
  callState: CallState;
}

export const initialSelectedDoctorState: SelectedDoctorState = {
  selectedDoctor: undefined,
  createdBooking: undefined,
  callState: CallState.INIT,
};
