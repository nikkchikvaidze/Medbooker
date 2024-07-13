import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducers/total-reducers';
import { DoctorsEffects } from './effects/doctor-search.effect';
import { DoctorBookEffects } from './effects/doctor-book.effect';
import { PatientsEffects } from './effects/patients.effect';
@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([DoctorsEffects, PatientsEffects, DoctorBookEffects]),
  ],
  declarations: [],
})
export class StoreStateModule {}
