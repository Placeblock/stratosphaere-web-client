import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Article } from '../classes/article';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../classes/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articlesUrl = environment.baseUrl + '/blog/articles'

  constructor(
    private http: HttpClient)
  {}

  getArticle(id: number, fields: string[]) {
    let params = new HttpParams();
    params = params.append("fields", fields.join(','))
    const options = {headers: environment.requestHeaders, params: params}
    return this.http.get<APIResponse<any>>(this.articlesUrl + "/" + id, options)
  }

  getArticles(offset: number, amount: number, showPublished: boolean, showUnpublished: boolean) {
    let params = new HttpParams();
    params = params.append("offset", offset).append("limit", amount)
    .append("published", showPublished).append("unpublished", showUnpublished);
    const options = {headers: environment.requestHeaders, params: params, observe: 'response' as 'response'}
    return this.http.get<APIResponse<number[]>>(this.articlesUrl, options)
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
