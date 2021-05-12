import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HelperService} from '../../../shared/services/helper.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-google-success',
  templateUrl: './google-success.component.html',
  styleUrls: ['./google-success.component.scss']
})
export class GoogleSuccessComponent implements OnInit {

  state: string;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private helperService: HelperService,
              private cookieService: CookieService) {
    route.paramMap.subscribe((param: ParamMap) => {
      if (param.get('userId') && param.get('accessToken')) {
        const accessToken = param.get('accessToken').substr(12);
        this.cookieService.set('accessToken', accessToken);

        setTimeout(() => {
          router.navigate(['/home']);
        }, 2500);
      }
    });
  }

  ngOnInit(): void {
    this.state = 'waiting';
    this.helperService.showSpinner();
  }

}
