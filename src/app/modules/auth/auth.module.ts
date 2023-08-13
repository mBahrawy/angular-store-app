import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    MaterialModule,
    SharedModule,
    AuthRoutingModule,
  ],
  providers: []
})
export class AuthModule { }
