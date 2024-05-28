import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NebularUiModule } from './nebular-ui';
@NgModule({
  declarations: [],
  imports: [CommonModule, NebularUiModule, FontAwesomeModule],
  exports: [NebularUiModule, FontAwesomeModule],
})
export class SharedModule {}
