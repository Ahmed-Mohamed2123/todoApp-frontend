import { UserInfoResponse } from './../../../interface/auth/userInfoResponse';
import { AuthService } from './../../../services/auth/auth.service';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<any>();
  myUserId: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((data: UserInfoResponse) => {
      if (data) {
        this.myUserId = data.user?._id;
      }
    });
  }

  close() {
    this.closeSidenav.emit();
  }

}
