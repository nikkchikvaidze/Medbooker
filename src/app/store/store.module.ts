import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducers/total-reducers';
import {
  DocDashboardAndRequestsEffects,
  DoctorBookEffects,
  DoctorsEffects,
  HealthPageEffects,
  PatientsEffects,
  UpcomingConsultationsEffects,
} from './effects';
import { AuthEffects } from './effects/auth.effect';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AuthEffects,
      DoctorsEffects,
      PatientsEffects,
      DoctorBookEffects,
      HealthPageEffects,
      UpcomingConsultationsEffects,
      DocDashboardAndRequestsEffects,
    ]),
  ],
  declarations: [],
})
export class StoreStateModule {}
