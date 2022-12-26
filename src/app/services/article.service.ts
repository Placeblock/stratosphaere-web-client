import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Article } from '../classes/article';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../classes/apiresponse';
import { first, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articlesUrl = environment.baseUrl + '/blog/articles'
  imageUrl = environment.baseUrl + '/blog/image'

  constructor(
    private http: HttpClient,
    private authService: AuthService)
  {}

  getArticle(id: number, fields: string[]): Observable<APIResponse<Article>> {
    let params = new HttpParams();
    params = params.append("fields", fields.join(','))
    const options = {headers: environment.requestHeaders, params: params}
    return this.http.get<APIResponse<any>>(this.articlesUrl + "/" + id, options).pipe(
      map(res => {return {...res, data: Article.deserialize(res.data)}})
    )
  }

  getArticles(offset: number, amount: number, showPublished: boolean, showUnpublished: boolean) {
    let params = new HttpParams();
    params = params.append("offset", offset).append("limit", amount)
    .append("published", showPublished).append("unpublished", showUnpublished)
    .append("loggedin", this.authService.token != null);
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
    return this.http.put<APIResponse<null>>(this.articlesUrl + "/" + article.id, article.serialize(), options)
  }

  publishArticle(id: number, publish: boolean): Observable<APIResponse<Date>> {
    const options = {headers: environment.requestHeaders}
    return this.http.put<APIResponse<string>>(this.articlesUrl + "/" + id + "/publish", {"publish": publish}, options).pipe(
      map(res => {return {...res, data: new Date(Date.parse(res.data))}})
    )
  }

  uploadImage(file: File): Observable<APIResponse<string>> {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<APIResponse<string>>(this.imageUrl, formData);
  }

  deleteImage(fileName: string) {
    console.log(fileName);
    const options = {headers: environment.requestHeaders}
    this.http.delete<APIResponse<null>>(this.imageUrl + "/" + fileName, options).pipe(first()).subscribe();
  }

}
