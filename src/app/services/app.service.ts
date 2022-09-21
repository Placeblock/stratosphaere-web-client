import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { retry } from 'rxjs/operators'
import { Article } from '../classes/article';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  headers = new HttpHeaders({'Content-Type' : 'application/json'});
  apiVersion = 'v1'
  authUrl = '/api/'+this.apiVersion+'/auth'
  articlesUrl = '/api/'+this.apiVersion+'/blog/articles/'

  constructor(private http: HttpClient) { }

  auth(username: string, password: string) {
    const options = {headers: this.headers}
    return this.http.post(this.authUrl, {"username":username,"password":password}, options).pipe(
      catchError(this.handleError)
    )
  }

  getArticle(id: number) {
    const options = {headers: this.headers}
    return this.http.get<Article>(this.authUrl + id, options).pipe(
      catchError(this.handleError)
    )
  }

  getArticles(pageSize: number, page: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageSize", pageSize).append("page", page)
    const options = {headers: this.headers, queryParams: queryParams}
    return this.http.get<Article[]>(this.authUrl + "?pageSize", options).pipe(
      catchError(this.handleError)
    )
  }

  
  deleteArticle(id: number) {
    const options = {headers: this.headers}
    return this.http.delete(this.authUrl + id, options).pipe(
      catchError(this.handleError)
    )
  }
  
  createArticle() {
    const options = {headers: this.headers}
    return this.http.post<Article>(this.authUrl, options).pipe(
      catchError(this.handleError)
    )
  }
  
  editArticle(article: Article) {
    const options = {headers: this.headers}
    return this.http.post(this.authUrl, article, options).pipe(
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
