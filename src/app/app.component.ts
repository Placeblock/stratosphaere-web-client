import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CookieService } from './services/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stratosphaere-web-client';

  constructor(private cookieService: CookieService, private authService: AuthService) {}

  ngOnInit() {
    let token = this.cookieService.getCookie("authToken")
    if (token != "") {
      this.authService.token = token;
    }
  }
}
