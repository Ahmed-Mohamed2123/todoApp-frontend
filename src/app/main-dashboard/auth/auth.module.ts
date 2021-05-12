import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FacebookSuccessComponent } from './facebook-success/facebook-success.component';
import { GoogleSuccessComponent } from './google-success/google-success.component';
import { GoogleFailureComponent } from './google-failure/google-failure.component';
import { FacebookFailureComponent } from './facebook-failure/facebook-failure.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {HelperService} from '../../shared/services/helper.service';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    FacebookSuccessComponent,
    GoogleSuccessComponent,
    GoogleFailureComponent,
    FacebookFailureComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [HelperService]
})
export class AuthModule { }
