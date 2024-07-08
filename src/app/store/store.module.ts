import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducers/total-reducers';
@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    //effects will be added here
    EffectsModule.forRoot([]),
  ],
  declarations: [],
})
export class StoreStateModule {}
