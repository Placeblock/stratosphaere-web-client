import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, first,  Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private notification: NotificationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return this.authService.$token.pipe(
      first(),
      switchMap(token => {
        const authReq = !!token ? request.clone({
          setHeaders: { Authorization: 'Bearer ' + token },
        }) : request;
        return next.handle(authReq).pipe(catchError((response: HttpErrorResponse) => {
          if ("msg" in response.error) {
            this.notification.error($localize `:API Response Error Title:Fehler!`, response.error.msg, 5000);
          } else {
            this.notification.error($localize `:API Response Error Title:Fehler!`, $localize `:API Response Error Description:Fehler bei der API-Kommunikation`, 5000);
          }
          return throwError(() => response)
        }));
      })
    );
  }
}
