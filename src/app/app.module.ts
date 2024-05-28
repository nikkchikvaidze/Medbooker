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
  DoctorSearchComponent,
  HealthRecordsComponent,
  LoginComponent,
  PatientsComponent,
  RegisterComponent,
  UpcomingConsultationsComponent,
} from './pages';
import { HeaderComponent } from './shell/header/header.component';
import { SidebarComponent } from './shell/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    SidebarComponent,
    ShellComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    DoctorSearchComponent,
    DoctorBookComponent,
    UpcomingConsultationsComponent,
    HealthRecordsComponent,
    PatientsComponent,
    ConsultationRequestsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
