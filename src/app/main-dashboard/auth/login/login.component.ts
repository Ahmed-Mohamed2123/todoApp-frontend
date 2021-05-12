import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {LoginAndSignupResponse} from '../../../interface/auth/loginAndSignupResponse';
import {HelperService} from '../../../shared/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginDto: FormGroup;
  forgotDto: FormGroup;
  isSent: boolean = false;
  message: string = null;

  // progress
  showProgress: boolean = false;

  // spinner
  state = '';

  constructor(private authService: AuthService,
              private router: Router,
              private cookieService: CookieService,
              private fb: FormBuilder,
              public helperService: HelperService) { }

  ngOnInit(): void {
    this.loginDto = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });

    this.forgotDto = this.fb.group({
      email: new FormControl(null, Validators.required)
    });
  }

  login() {
    this.state = 'Waiting';
    this.helperService.showSpinner();
    this.authService.login(this.loginDto.value)
      .subscribe((data: LoginAndSignupResponse) => {
        this.cookieService.set('accessToken', data.accessToken);
        this.router.navigate(['/home']);
        this.helperService.hideSpinner();
      }, () => {
        this.helperService.openSnackbar('Either Email or password are incorrect', 'Ok');
        this.helperService.hideSpinner();
      });
  }

  sentEmailForgotPassword() {
    this.showProgress = true;
    this.authService.forgotPassword(this.forgotDto.value)
      .subscribe(() => {
        this.showProgress = false;
        this.message = 'message has been send successfully';
        this.isSent = true;
      }, error => {
        this.showProgress = false;
      });
  }

}
