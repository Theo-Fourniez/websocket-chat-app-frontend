import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            if (err.url?.split('/').pop() !== 'user') {
              console.debug(
                'UnauthorizedInterceptor: Redirecting to home because caught a 401 at ',
                err.url,
              );
              // if not trying to log in or register and we get 401
              // then the auth cookie is invalid or expired
              this.userService.logout();
              this.router.navigate(['/']);
            }
          }
        },
      }),
    );
  }
}
