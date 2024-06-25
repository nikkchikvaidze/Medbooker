import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NebularUiModule } from './nebular-ui';
import { NamePipe } from './pipes/name.pipe';
import { RequestCardComponent } from './request-card/request-card.component';
import { NbCardModule } from '@nebular/theme';
import { ConsultationCancelCardComponent } from './consultation-cancel-card/consultation-cancel-card.component';
import { ConsultationCardComponent } from './consultation-card/consultation-card.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    NamePipe,
    RequestCardComponent,
    ConsultationCancelCardComponent,
    ConsultationCardComponent,
    MapComponent,
  ],
  imports: [CommonModule, NebularUiModule, FontAwesomeModule, NbCardModule],
  exports: [
    NebularUiModule,
    FontAwesomeModule,
    RequestCardComponent,
    NamePipe,
    ConsultationCancelCardComponent,
    ConsultationCardComponent,
    MapComponent,
  ],
})
export class SharedModule {}
