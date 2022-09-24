import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from './services/cookie.service';
import { AuthActions } from './state/auth/auth.actions';
import { AuthState } from './state/auth/auth.reducer';

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
  }
}
