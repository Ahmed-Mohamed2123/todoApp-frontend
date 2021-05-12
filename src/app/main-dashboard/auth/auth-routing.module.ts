import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {FacebookSuccessComponent} from './facebook-success/facebook-success.component';
import {FacebookFailureComponent} from './facebook-failure/facebook-failure.component';
import {GoogleSuccessComponent} from './google-success/google-success.component';
import {GoogleFailureComponent} from './google-failure/google-failure.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'facebook-success/:userId/:accessToken',
        component: FacebookSuccessComponent
      },
      {
        path: 'facebook-failure',
        component: FacebookFailureComponent
      },
      {
        path: 'google-success/:userId/:accessToken',
        component: GoogleSuccessComponent
      },
      {
        path: 'google-failure',
        component: GoogleFailureComponent
      },
      {
        path: 'reset-password/:token',
        component: ResetPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
