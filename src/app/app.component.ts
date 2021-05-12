import { AuthService } from './services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  t = false;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.prepareUserInfo();
  }
}
