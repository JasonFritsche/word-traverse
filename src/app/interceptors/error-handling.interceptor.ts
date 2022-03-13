import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { AppService } from "../services/app.service";

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private appService: AppService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = "";
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        this.appService.showToaster({ message: errorMsg, messageType: "error" });
        return throwError((errorMsg: string) => new Error(errorMsg));
      })
    );
  }
}
