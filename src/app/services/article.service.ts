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
    private http: HttpClient)
  {}

  getArticle(id: number) {
    const options = {headers: environment.requestHeaders}
    return this.http.get<APIResponse<Article>>(this.articlesUrl + "/" + id, options)
  }

  getArticles(offset: number, amount: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("offset", offset).append("amount", amount)
    const options = {headers: environment.requestHeaders, queryParams: queryParams}
    return this.http.get<APIResponse<Article[]>>(this.articlesUrl, options)
  }

  
  deleteArticle(id: number) {
    const options = {headers: environment.requestHeaders}
    return this.http.delete<APIResponse<Article>>(this.articlesUrl + "/" + id, options)
  }
  
  createArticle() {
    const options = {headers: environment.requestHeaders}
    return this.http.post<APIResponse<Article>>(this.articlesUrl, options)
  }
  
  editArticle(article: Article) {
    const options = {headers: environment.requestHeaders}
    return this.http.put<APIResponse<null>>(this.articlesUrl + "/" + article.id, article, options)
  }

  publishArticle(id: number, publish: boolean) {
    const options = {headers: environment.requestHeaders}
    return this.http.put<APIResponse<number>>(this.articlesUrl + "/" + id + "/publish", {"publish": publish}, options)
  }


}
