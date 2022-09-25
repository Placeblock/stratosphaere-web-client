import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { CookieService } from './services/cookie.service';
import { AuthActions } from './state/auth/auth.actions';
import { AuthState } from './state/auth/auth.reducer';
import { concatMap, delay, exhaustMap, map, mergeMap, switchMap, tap } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stratosphaere-web-client';

  constructor(private cookieService: CookieService, private store: Store<{auth: AuthState}>) {}

  ngOnInit() {
    let token = this.cookieService.getCookie("authToken")
    if (token != "") {
      this.store.dispatch(AuthActions.authSuccess({token: token}))
    }

    /*const userInput$ = new Observable<number>((sub) => {
      sub.next(1000)
      sub.next(500)
    })
    const result$ = userInput$.pipe(
      mergeMap(sourceValue => 
        this.simulateHttp("fetched data " + sourceValue, sourceValue).pipe(
          map(sourceValue => sourceValue + "XD")
        )
      ),
      tap(console.log)
    )
    result$.subscribe(
      (value => {console.log("TEST VALUEL: " + value)})
    )*/

    const observable = new Observable<number>((sub) => {
      sub.next(300);
      sub.next(500);
    })

    observable.pipe(
      switchMap((value) => {
        return this.simulateHttp("Test Request" + value, value)
      }),
    ).subscribe(value => console.log(value))
  }

  simulateHttp(content: string, del: number): Observable<string> {
    return of(content).pipe(delay(del));
  }
}
