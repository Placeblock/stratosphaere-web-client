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

  constructor(private fb: FormBuilder, public authService: AuthService, private cookieService: CookieService) {}

  toggleShowLogin() {
    this.showLogin = !this.showLogin;
  }

  logOut() {
    this.authService.token = null;
    this.cookieService.deleteCookie("authToken");
  }

  logIn({username, password}: {"username": string, "password": string}) {
    this.authService.auth(username, password).pipe(first()).subscribe(response => {
      this.authService.token = response.data;
      this.cookieService.setCookie({"name":"authToken","value":response.data});
    })
    this.showLogin = false;
  }


}
