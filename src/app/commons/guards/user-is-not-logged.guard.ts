import { AuthService } from './../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserIsNotLoggedGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

    canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return new Promise(resolve => {
        if (this.authService.isLoggedIn()) {

          this.authService.currentUser.subscribe(dat => {
            if (dat?.user.roles.some(role => role === 'admin')) {
              resolve(true);
            }
          });
        } else {
          this.router.navigate(['/auth/login']);
          resolve(false);
        }

      });

    }

}
