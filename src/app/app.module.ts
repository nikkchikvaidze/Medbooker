import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { ShellComponent } from './shell/shell/shell.component';
import {
  ConsultationRequestsComponent,
  DashboardComponent,
  DoctorBookComponent,
  DoctorDashboardComponent,
  DoctorSearchComponent,
  HealthRecordsComponent,
  PatientDashboardComponent,
  PatientsComponent,
  UpcomingConsultationsComponent,
} from './pages';
import { HeaderComponent } from './shell/header/header.component';
import { SidebarComponent } from './shell/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BASE_URL } from './shared';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbDatepickerModule,
  NbInputModule,
  NbUserModule,
} from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    SidebarComponent,
    ShellComponent,
    DashboardComponent,
    DoctorSearchComponent,
    DoctorBookComponent,
    UpcomingConsultationsComponent,
    HealthRecordsComponent,
    PatientsComponent,
    ConsultationRequestsComponent,
    DoctorDashboardComponent,
    PatientDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    NbCardModule,
    NbDatepickerModule.forRoot(),
    NbInputModule,
    NbUserModule,
  ],
  providers: [{ provide: BASE_URL, useValue: environment.SUPABASE_BASE_URL }],
  bootstrap: [AppComponent],
})
export class AppModule {}
