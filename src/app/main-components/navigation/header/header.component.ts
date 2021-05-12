import { AuthService } from './../../../services/auth/auth.service';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<any>();

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }

}
