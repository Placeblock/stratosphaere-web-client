import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/state/auth/auth.reducer';
import { selectToken } from 'src/app/state/auth/auth.selector';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthActions } from 'src/app/state/auth/auth.actions';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showLogin: boolean = false;
  token$: Observable<string | null>

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.maxLength(50)]],
  });


  constructor(private fb: FormBuilder, private store: Store<{article: AuthState}>) {
    this.token$ = store.select(selectToken)
  }

  toggleShowLogin() {
    this.showLogin = !this.showLogin;
  }

  logOut() {
    this.store.dispatch(AuthActions.logout())
  }

  logIn() {
    let username = this.loginForm.get("username")?.value;
    let password = this.loginForm.get("password")?.value;
    if (password == null || username == null) return;
    this.store.dispatch(AuthActions.auth({username: username, password: password}))
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
