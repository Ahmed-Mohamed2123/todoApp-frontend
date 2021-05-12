import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ApiEndpoints } from '../../commons/end-points';
import {BehaviorSubject, Observable} from 'rxjs';
import { LoginAndSignupResponse } from '../../interface/auth/loginAndSignupResponse';
import {UserInfoResponse} from '../../interface/auth/userInfoResponse';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public userId: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService) { }

  login(loginData: any): Observable<LoginAndSignupResponse> {
    try {
      return this.http.post<LoginAndSignupResponse>(ApiEndpoints.AuthEndpoints.login, loginData);
    } catch (e) {
      console.error(e);
    }
  }

  signup(signupData: any): Observable<LoginAndSignupResponse> {
    try {
      return this.http.post<LoginAndSignupResponse>(ApiEndpoints.AuthEndpoints.signup, signupData);
    } catch (e) {
      console.error(e);
    }
  }

  prepareUserInfo() {
    if (this.isLoggedIn()) {
      this.getUserInfo().subscribe((data: UserInfoResponse) => {
        this.currentUser.next(data);
      });
    }
  }

  getUserInfo(): Observable<UserInfoResponse> {
    try {
      return this.http.get<UserInfoResponse>(ApiEndpoints.AuthEndpoints.getUserInfo);
    } catch (e) {
      console.error(e);
    }
  }

  forgotPassword(forgotPassword: any): Observable<any> {
    try {
      return this.http.post<any>(ApiEndpoints.AuthEndpoints.forgotPassword, forgotPassword);
    } catch (error) {
      console.error(error);
    }
  }

  resetPassword(token: any, resetPassword: any): Observable<any> {
    try {
      return this.http.put<any>(`${ApiEndpoints.AuthEndpoints.resetPassword}/${token}`, resetPassword);
    } catch (err) {
      console.error(err);
    }
  }

  getToken() {
    return this.cookieService.get('accessToken');
  }

  isLoggedIn() {
    return this.cookieService.check('accessToken');
  }

  isAdmin(): boolean {
    return this.currentUser.value?.user.roles.some(role => role === 'admin');
  }

  Logout() {
    this.cookieService.delete('accessToken');
    this.router.navigate(['auth/login']);
  }

}
