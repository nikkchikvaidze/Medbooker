import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NebularUiModule } from './nebular-ui';
import { NamePipe } from './pipes/name.pipe';
import { RequestCardComponent } from './request-card/request-card.component';
import { NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [NamePipe, RequestCardComponent],
  imports: [CommonModule, NebularUiModule, FontAwesomeModule, NbCardModule],
  exports: [NebularUiModule, FontAwesomeModule, RequestCardComponent, NamePipe],
})
export class SharedModule {}
