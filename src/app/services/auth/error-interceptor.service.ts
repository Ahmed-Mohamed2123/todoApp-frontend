import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        let error = null;
        if ([401].indexOf(err.status) !== -1) {
          // Unauthorized, => redirect to login page
          this.router.navigate(['/auth/login']);
        } else if ([403].indexOf(err.status) !== -1) {
          // Forbidden, redirect to login page
          this.router.navigate(['/auth/login']);
        } else if (err.status === 404) {
          // NotFoundPage, redirect to notFoundResource page
          this.router.navigate(['/notFoundResource', err.status], {
            queryParams: {
              'Error-Status': err.status
            }
          });
        } else if (err.status === 500) {
          // ServerInternal, redirect to applicationError
          this.router.navigate(['/applicationError', err.status], {
            queryParams: {
              'Error-Status': err.status
            }
          });
        }

        error = err.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
