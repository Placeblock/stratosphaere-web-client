import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../classes/apiresponse';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = environment.baseUrl + '/auth'

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  auth(username: string, password: string) {
    const options = {headers: environment.requestHeaders}
    return this.http.post<APIResponse<string>>(this.authUrl, {"username":username,"password":password}, options).pipe(
      catchError(this.errorHandler.handleError)
    )
  }
}
