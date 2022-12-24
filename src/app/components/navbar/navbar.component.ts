import { Component } from '@angular/core';
import { first, Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'src/app/services/cookie.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showLogin: boolean = false;

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.maxLength(50)]],
  });


  constructor(private fb: FormBuilder, public authService: AuthService, private cookieService: CookieService) {}

  toggleShowLogin() {
    this.showLogin = !this.showLogin;
  }

  logOut() {
    this.authService.token = null;
    this.cookieService.deleteCookie("authToken");
  }

  logIn() {
    if (!this.loginForm.valid) return;
    let username = this.loginForm.get("username")?.value;
    let password = this.loginForm.get("password")?.value;
    if (username == null || password == null) return;
    this.authService.auth(username, password).pipe(first()).subscribe(response => {
      this.authService.token = response.data;
      this.cookieService.setCookie({"name":"authToken","value":response.data});
    })
    this.showLogin = false;
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
