import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, share, take, tap } from 'rxjs';
import { APIResponse, ApiService } from './apiservice';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService{
  authUrl = this.apiUrl + '/auth'

  constructor(private http: HttpClient) {
    super()
  }

  auth(username: string, password: string) {
    console.log("AUTH REQUEST")
    const options = {headers: this.headers}
    return this.http.post<APIResponse<string>>(this.authUrl, {"username":username,"password":password}, options).pipe(
      take(1),
      tap(response => console.log(response)),
      catchError(this.handleError)
    )
  }
}
