import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { NebularUiModule } from '../shared';
import { ReactiveFormsModule } from '@angular/forms';
import { NbIconModule, NbInputModule } from '@nebular/theme';
import { ErrorMessageDirective } from '../directives/error-message.directive';

@NgModule({
  imports: [
    CommonModule,
    NebularUiModule,
    ReactiveFormsModule,
    NbInputModule,
    NbIconModule,
  ],
  declarations: [LoginComponent, RegisterComponent, ErrorMessageDirective],
  exports: [LoginComponent, RegisterComponent, ErrorMessageDirective],
})
export class AuthModule {}
