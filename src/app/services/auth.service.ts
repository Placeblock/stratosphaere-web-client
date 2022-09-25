import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, share, take, tap } from 'rxjs';
import { APIResponse, ApiService } from './apiservice';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService{
  authUrl = this.apiUrl + '/auth'

  constructor(private http: HttpClient, notificationService: NotificationService) {
    super(notificationService);
  }

  auth(username: string, password: string) :Observable<APIResponse<string>> {
    console.log("AUTH REQUEST")
    const options = {headers: this.headers}
    return this.http.post<APIResponse<string>>(this.authUrl, {"username":username,"password":password}, options)
  }
}
