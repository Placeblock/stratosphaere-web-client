import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationComponent } from './components/notification/notification.component';

import { ApiInterceptor } from './interceptors/api.interceptor';
import { SharedModule } from './modules/shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DatenschutzComponent } from './components/datenschutz/datenschutz.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotificationComponent,
    LoginFormComponent,
    DatenschutzComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
