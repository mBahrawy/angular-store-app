import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  baseUrl: string = environment.baseUrl;

  constructor(private auth: AuthService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      url: `${this.baseUrl}/${request.url}`,
      setHeaders: {
        'Content-Type': 'application/json',
        ...(this.auth.getToken() && {'Authorization': `${this.auth.getToken()}`}),
      },
    });

    return next.handle(request);
  }
}
