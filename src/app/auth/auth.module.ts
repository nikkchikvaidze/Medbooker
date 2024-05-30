import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
@NgModule({
  imports: [CommonModule],
  declarations: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
