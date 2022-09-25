import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, take, tap } from 'rxjs';
import { Article } from '../classes/article';
import { APIResponse, ApiService } from './apiservice';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends ApiService {
  articlesUrl = this.apiUrl + '/blog/articles'

  constructor(private http: HttpClient, notificationService: NotificationService) {
    super(notificationService);
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
    return this.http.delete<APIResponse<Article>>(this.articlesUrl + "/" + id, options).pipe(
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
    console.log(article);
    const options = {headers: this.headers}
    return this.http.put<APIResponse<null>>(this.articlesUrl + "/" + article.id, article, options).pipe(
      tap(response => {console.log("RESPONSE")}),
      catchError(this.handleError)
    )
  }

  publishArticle(id: number, publish: boolean) {
    console.log(id)
    console.log(publish)
    const options = {headers: this.headers}
    return this.http.put<APIResponse<number>>(this.articlesUrl + "/" + id + "/publish", {"publish": publish}, options).pipe(
      catchError(this.handleError)
    )
  }


}
