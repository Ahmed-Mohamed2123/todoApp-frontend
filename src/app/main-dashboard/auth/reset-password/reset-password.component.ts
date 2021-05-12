import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../../shared/validators/must-match.validators';
import {HelperService} from '../../../shared/services/helper.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  private newPasswordToken: string;
  resetPasswordDto: FormGroup;

  state: string;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private helperService: HelperService) {
    route.paramMap.subscribe((params: ParamMap) => {
      if (!params.get('token')) {
        router.navigate(['/home']);
      }

      this.newPasswordToken = params.get('token');
    });
  }

  ngOnInit(): void {
    this.resetPasswordDto = this.fb.group({
      password: new FormControl(null, [Validators.required]),
      passwordConfirm: new FormControl(null, [Validators.required]),
    }, {
      validators: MustMatch('password', 'passwordConfirm')
    });
  }

  resetPassword() {
    this.state = 'waiting';
    this.helperService.showSpinner();
    this.authService.resetPassword(this.newPasswordToken, this.resetPasswordDto.value)
      .subscribe(() => {
        this.helperService.hideSpinner();
        this.helperService.openSnackbar('You have reset your password successfully', null);
        this.router.navigate(['/auth/login']);
      }, err => {
        this.helperService.hideSpinner();
        this.helperService.openSnackbar('An unknown error occurred', 'OK');
      });
  }

}
