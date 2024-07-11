import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducers/total-reducers';
import { DoctorsEffects } from './effects/doctor-search.effect';
@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([DoctorsEffects]),
  ],
  declarations: [],
})
export class StoreStateModule {}
