import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToasterService } from 'src/services/toaster.service';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private toasterService: ToasterService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        this.toasterService.showToaster({
          message: errorMsg,
          messageType: 'error',
        });
        return throwError((errorMsg: string) => new Error(errorMsg));
      })
    );
  }
}
