import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorIntercepter implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          return throwError(err.statusText);
        }
        if (err instanceof HttpErrorResponse) {
          const applicationError = err.headers.get('Application-Error');
          if (applicationError) {
            return throwError(applicationError);
          }
          const severError = err.error;
          let modalStateErrors = '';
          if (severError.errors && typeof severError.errors === 'object') {
            for (const key in severError.errors) {
              if (severError.errors[key]) {
                modalStateErrors += severError.errors[key] + '\n';
              }
            }
          }
          return throwError(modalStateErrors || severError || 'Server Error');
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorIntercepter,
  multi: true
};
