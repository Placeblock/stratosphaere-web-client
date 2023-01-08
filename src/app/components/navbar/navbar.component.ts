import { Component, HostBinding, HostListener } from '@angular/core';
import { first } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'src/app/services/cookie.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showLogin: boolean = false;
  burgerIcon = faBars;

  @HostBinding('class.solid') navSolid: boolean = false;
  @HostBinding('class.hidden') navHidden: boolean = true;

  constructor(public authService: AuthService, private cookieService: CookieService, private router: Router) {
    router.events.subscribe(() => {
      this.navHidden = true;
    })
  }

  @HostListener("window:scroll", []) onWindowScroll() {
    // do some stuff here when the window is scrolled
    const verticalOffset = window.pageYOffset 
          || document.documentElement.scrollTop 
          || document.body.scrollTop || 0;
    this.navSolid = verticalOffset > 50;
  }

  toggleShowLogin() {
    this.showLogin = !this.showLogin;
    this.navHidden = true;
  }

  logOut() {
    this.authService.token = null;
    this.cookieService.deleteCookie("authToken");
  }

  logIn({username, password}: {"username": string, "password": string}) {
    this.authService.auth(username, password).pipe(first()).subscribe(() => {
      const token = this.cookieService.getCookie("authToken");
      if (token == "") return;
      this.authService.token = token;
    })
    this.showLogin = false;
  }
}
