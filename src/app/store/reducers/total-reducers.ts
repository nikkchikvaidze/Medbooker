import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { doctorBookReducer } from './doctor-book.reducer';
import { doctorDashboardAndRequestsPageReducer } from './doctor-dashboard&requests.reducer';
import { doctorsReducer } from './doctor-search.reducer';
import { healthReducer } from './health.reducer';
import { patientsReducer } from './patients.reducer';
import { upcomingReducer } from './upcoming-consultations.reducer';
import { authReducer } from './auth.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  healthPage: healthReducer,
  upcomingConsultationsPage: upcomingReducer,
  doctorDashboardAndRequestsPage: doctorDashboardAndRequestsPageReducer,
  patientsPage: patientsReducer,
  doctorSearchPage: doctorsReducer,
  doctorBookPage: doctorBookReducer,
};
