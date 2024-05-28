import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import {
  ConsultationRequestsComponent,
  DashboardComponent,
  DoctorBookComponent,
  DoctorSearchComponent,
  HealthRecordsComponent,
  LoginComponent,
  PatientsComponent,
  RegisterComponent,
  UpcomingConsultationsComponent,
} from './pages';
import { ShellComponent } from './shell/shell/shell.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'search',
        component: DoctorSearchComponent,
      },
      {
        path: 'booking/:id',
        component: DoctorBookComponent,
      },
      {
        path: 'upcoming-consultations',
        component: UpcomingConsultationsComponent,
      },
      {
        path: 'consultation-requests',
        component: ConsultationRequestsComponent,
      },
      {
        path: 'health-records',
        component: HealthRecordsComponent,
      },
      {
        path: 'patients',
        component: PatientsComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
