import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import {
  ConsultationRequestsComponent,
  DashboardComponent,
  DoctorBookComponent,
  DoctorSearchComponent,
  HealthRecordsComponent,
  PatientsComponent,
  UpcomingConsultationsComponent,
} from './pages';
import { ShellComponent } from './shell/shell/shell.component';
import { LoginComponent } from './auth/login';
import { RegisterComponent } from './auth/register';
import { AnonymGuard, AuthGuard, PermissionGuard } from './guards';
import { Roles } from './models/user.model';
import { NotFoundComponent } from './shell/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomepageComponent,
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [AuthGuard],
    component: RegisterComponent,
  },
  {
    path: 'shell',
    component: ShellComponent,
    canActivate: [AnonymGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'search',
        canActivate: [PermissionGuard],
        component: DoctorSearchComponent,
        data: {
          role: Roles.Patient,
        },
      },
      {
        path: 'booking/:id',
        canActivate: [PermissionGuard],
        component: DoctorBookComponent,
        data: {
          role: Roles.Patient,
        },
      },
      {
        path: 'upcoming-consultations',
        component: UpcomingConsultationsComponent,
      },
      {
        path: 'consultation-requests',
        canActivate: [PermissionGuard],
        component: ConsultationRequestsComponent,
        data: {
          role: Roles.Doctor,
        },
      },
      {
        path: 'health-records',
        canActivate: [PermissionGuard],
        component: HealthRecordsComponent,
        data: {
          role: Roles.Patient,
        },
      },
      {
        path: 'patients',
        canActivate: [PermissionGuard],
        component: PatientsComponent,
        data: {
          role: Roles.Doctor,
        },
      },
    ],
  },
  {
    path: '**',
    canActivate: [AnonymGuard],
    component: NotFoundComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
