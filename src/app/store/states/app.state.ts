import {
  initialSelectedDoctorState,
  SelectedDoctorState,
} from './doctor-book.state';
import {
  DoctorDashboardAndRequests,
  initialDoctorDashboardAndRequestsState,
} from './doctor-dashboard&requests.state';
import { DoctorState, initialDoctorState } from './doctor-search.state';
import { HealthState, initialHealthState } from './health.state';
import { initialPatientState, PatientsState } from './patients.state';
import {
  initialUpcomingState,
  UpcomingState,
} from './upcoming-consultations.state';

export interface AppState {
  healthPage: HealthState;
  upcomingConsultationsPage: UpcomingState;
  doctorDashboardAndRequestsPage: DoctorDashboardAndRequests;
  patientsPage: PatientsState;
  doctorSearchPage: DoctorState;
  doctorBookPage: SelectedDoctorState;
}

export const initialAppState: AppState = {
  healthPage: initialHealthState,
  upcomingConsultationsPage: initialUpcomingState,
  doctorDashboardAndRequestsPage: initialDoctorDashboardAndRequestsState,
  patientsPage: initialPatientState,
  doctorSearchPage: initialDoctorState,
  doctorBookPage: initialSelectedDoctorState,
};
