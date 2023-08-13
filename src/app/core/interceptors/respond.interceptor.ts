import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RespondInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'Something wrong happnened.';

        if (error.status === 404) {
          // console.log(error.error);
          this.toastr.error("The requested resource was not found.");
          return throwError(error.error.error);
        }

        if (error.status === 400) {
          // console.log(error.error);
          this.toastr.error(error.error.error);
          return throwError(error.error.error);
        }

        // Default error handling
        // console.log(error);
        this.toastr.error(errorMsg);
        return throwError(errorMsg);
      })
    ) ;
  }
}
