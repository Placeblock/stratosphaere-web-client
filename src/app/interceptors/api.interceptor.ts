import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { concatMap, Observable, take } from 'rxjs';
import { AuthState } from '../state/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { selectToken } from '../state/auth/auth.selector';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  authToken$

  constructor(store: Store<{auth: AuthState}>) {
    this.authToken$ = store.select(selectToken)
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return this.authToken$.pipe(
      concatMap(authToken => {
        if (authToken) {
          const duplicate = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${authToken}`)
          })
          return next.handle(duplicate)
        } else {
          return next.handle(request);
        }
      })
    );
  }
}
