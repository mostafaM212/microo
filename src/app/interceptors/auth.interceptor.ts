import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.isAuthenticated$.getValue()) {
      const newRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          this.authService.token$.getValue()
        ),
      });

      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
