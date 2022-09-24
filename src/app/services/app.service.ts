import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { retry } from 'rxjs/operators'
import { Article } from '../classes/article';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  headers = new HttpHeaders({'Content-Type' : 'application/json'});
  apiVersion = 'v1'
  apiUrl = environment.baseUrl + environment.apiVersion
  authUrl = this.apiUrl + '/auth'
  articlesUrl = this.apiUrl + '/blog/articles'

  constructor(private http: HttpClient) { }

  auth(username: string, password: string) {
    const options = {headers: this.headers}
    return this.http.post<APIResponse<Article>>(this.authUrl, {"username":username,"password":password}, options).pipe(
      catchError(this.handleError)
    )
  }

  getArticle(id: number) {
    const options = {headers: this.headers}
    return this.http.get<APIResponse<Article>>(this.articlesUrl + "/" + id, options).pipe(
      catchError(this.handleError)
    )
  }

  getArticles(offset: number, amount: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("offset", offset).append("amount", amount)
    const options = {headers: this.headers, queryParams: queryParams}
    return this.http.get<APIResponse<Article[]>>(this.articlesUrl, options).pipe(
      catchError(this.handleError)
    )
  }

  
  deleteArticle(id: number) {
    const options = {headers: this.headers}
    return this.http.delete(this.articlesUrl + "/" + id, options).pipe(
      catchError(this.handleError)
    )
  }
  
  createArticle() {
    const options = {headers: this.headers}
    return this.http.post<APIResponse<Article>>(this.articlesUrl, options).pipe(
      catchError(this.handleError)
    )
  }
  
  editArticle(article: Article) {
    const options = {headers: this.headers}
    return this.http.post(this.articlesUrl, article, options).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: any) {
    console.log(error)
    return throwError(() => {
      return error
    })
  }

}

export interface APIResponse<D> {
  code: number,
  msg: string,
  data: D
}