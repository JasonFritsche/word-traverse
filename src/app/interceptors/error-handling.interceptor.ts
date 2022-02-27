import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { catchError, debounceTime, Observable, throwError } from "rxjs";
import { AppService } from "../services/app.service";

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private appService: AppService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = "";
        if (error.error instanceof ErrorEvent) {
          console.log("This is client side error");
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log("This is server side error");
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        console.log(errorMsg);
        this.appService.showToaster({ message: errorMsg, messageType: "error" });
        return throwError((errorMsg: string) => new Error(errorMsg));
      })
    );
  }
}
