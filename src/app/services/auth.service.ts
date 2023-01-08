import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../classes/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = environment.baseUrl + '/auth'
  private _token: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  $token: Observable<string | null> = this._token.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  public get token(): string | null {
    return this._token.getValue();
  }

  public set token(value: string | null) {
    this._token.next(value);
  }

  auth(username: string, password: string) {
    const options = {headers: environment.requestHeaders, withCredentials: true}
    return this.http.post<APIResponse<string>>(this.authUrl, {"username":username,"password":password}, options)
  }
}
