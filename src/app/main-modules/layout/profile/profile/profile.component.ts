import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserInfoResponse } from './../../../../interface/auth/userInfoResponse';
import { AuthService } from './../../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  links = ['tasks', 'follower', 'following'];
  background: ThemePalette = undefined;

  email: string;

  userId;

  constructor(private authService: AuthService,
              private route: ActivatedRoute) {
    route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('userId')) {
        this.userId = params.get('userId');
        console.log(this.userId);
      }
    })
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((data: UserInfoResponse) => {
      if (data) {
        this.email = data.user.email;
      }
    });
  }

}
