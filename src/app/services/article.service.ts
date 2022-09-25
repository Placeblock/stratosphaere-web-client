import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { Article } from '../classes/article';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../classes/apiresponse';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articlesUrl = environment.baseUrl + '/blog/articles'

  constructor(
    private http: HttpClient, 
    private errorHandler: ErrorHandlerService) 
  {}

  getArticle(id: number) {
    const options = {headers: environment.requestHeaders}
    return this.http.get<APIResponse<Article>>(this.articlesUrl + "/" + id, options).pipe(
      catchError(this.errorHandler.handleError)
    )
  }

  getArticles(offset: number, amount: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("offset", offset).append("amount", amount)
    const options = {headers: environment.requestHeaders, queryParams: queryParams}
    return this.http.get<APIResponse<Article[]>>(this.articlesUrl, options).pipe(
      catchError(this.errorHandler.handleError)
    )
  }

  
  deleteArticle(id: number) {
    const options = {headers: environment.requestHeaders}
    return this.http.delete<APIResponse<Article>>(this.articlesUrl + "/" + id, options).pipe(
      catchError(this.errorHandler.handleError)
    )
  }
  
  createArticle() {
    const options = {headers: environment.requestHeaders}
    return this.http.post<APIResponse<Article>>(this.articlesUrl, options).pipe(
      catchError(this.errorHandler.handleError)
    )
  }
  
  editArticle(article: Article) {
    const options = {headers: environment.requestHeaders}
    return this.http.put<APIResponse<null>>(this.articlesUrl + "/" + article.id, article, options).pipe(
      catchError(this.errorHandler.handleError)
    )
  }

  publishArticle(id: number, publish: boolean) {
    const options = {headers: environment.requestHeaders}
    return this.http.put<APIResponse<number>>(this.articlesUrl + "/" + id + "/publish", {"publish": publish}, options).pipe(
      catchError(this.errorHandler.handleError)
    )
  }


}
