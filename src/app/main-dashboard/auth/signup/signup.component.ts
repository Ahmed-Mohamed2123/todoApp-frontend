import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HelperService} from '../../../shared/services/helper.service';
import {LoginAndSignupResponse} from '../../../interface/auth/loginAndSignupResponse';
import {MustMatch} from '../../../shared/validators/must-match.validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupDto: FormGroup;

  // spinner
  state = '';

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private cookieService: CookieService,
              private helperService: HelperService) { }

  ngOnInit(): void {
    this.signupDto = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      passwordConfirm: new FormControl(null, Validators.required)
    }, {
      validators: MustMatch('password', 'passwordConfirm')
    });
  }

  signup() {
    this.state = 'Waiting';
    this.helperService.showSpinner();
    this.authService.signup(this.signupDto.value)
      .subscribe((data: LoginAndSignupResponse) => {
        this.cookieService.set('accessToken', data.accessToken);
        this.router.navigate(['/home']);
        this.helperService.hideSpinner();
      }, () => {
        this.helperService.openSnackbar('An error has occurred!', 'Ok');
        this.helperService.hideSpinner();
      })
  }

}
