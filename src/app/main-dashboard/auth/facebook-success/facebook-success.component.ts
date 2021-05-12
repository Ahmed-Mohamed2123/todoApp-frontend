import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HelperService} from '../../../shared/services/helper.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-facebook-success',
  templateUrl: './facebook-success.component.html',
  styleUrls: ['./facebook-success.component.scss']
})
export class FacebookSuccessComponent implements OnInit {

  state: string;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private helperService: HelperService,
              private cookieService: CookieService) {

    route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('userId') && params.get('accessToken')) {
        this.cookieService.set('accessToken', params.get('accessToken').substr(12));

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2500);
      }
    });
  }

  ngOnInit(): void {
    this.state = 'Waiting';
    this.helperService.showSpinner();
  }

}
