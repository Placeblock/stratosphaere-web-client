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


  constructor(private fb: FormBuilder, private store: Store<{auth: AuthState}>) {
    this.token$ = store.select(selectToken)
  }

  toggleShowLogin() {
    this.showLogin = !this.showLogin;
  }

  logOut() {
    console.log("LOGOUT")
    this.store.dispatch(AuthActions.authLogout())
  }

  logIn() {
    console.log("LOGIN")
    let username = this.loginForm.get("username")?.value;
    let password = this.loginForm.get("password")?.value;
    if (password == null || username == null) return;
    this.store.dispatch(AuthActions.authLogin({username: username, password: password}))
    this.showLogin = false;
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
