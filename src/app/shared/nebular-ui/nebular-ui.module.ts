import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbButtonModule,
  NbLayoutModule,
  NbSelectModule,
  NbSidebarModule,
  NbThemeModule,
} from '@nebular/theme';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbButtonModule,
    NbSidebarModule,
    NbSidebarModule.forRoot(),
    NbSelectModule,
  ],
  exports: [NbLayoutModule, NbButtonModule, NbSidebarModule, NbSelectModule],
})
export class NebularUiModule {}
