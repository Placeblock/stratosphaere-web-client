import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { ArticleActions } from 'src/app/state/article/article.actions';
import { ArticleState } from 'src/app/state/article/article.reducer';
import { selectArticles } from 'src/app/state/article/article.selector';

@Injectable({
  providedIn: 'root'
})
export class ArticleGuard implements CanActivate {

  constructor(private store: Store<{article: ArticleState}>, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let redirectUrl = route.data['redirectUrl']
    let loadedUrl = route.data['loadedUrl']
    if (!("id" in route.params)) {
      console.log("ID NOT IN ROUTE PARAMS")
      this.router.navigate(redirectUrl)
      return false;
    }
    let id = route.params["id"];
    return this.isArticleLoaded(id).pipe(
      switchMap(loaded => {
        if (loaded) {
          return of(true)
        } else {
          this.store.dispatch(ArticleActions.get({id: id}))
          let subscription = this.store.select(selectArticles).pipe(
            tap(articles=>{console.log("ARTICLES CHANGE")}),
            map(articles => {
              if (articles?.find(article => article.id == id) != undefined) {
                this.router.navigate([loadedUrl + id])
                subscription.unsubscribe()
              }
            })
          ).subscribe()
          this.router.navigate(redirectUrl)
          return of(false);
        }
      })
    )

  }

  isArticleLoaded(id: number):Observable<boolean> {
    return this.store.select(selectArticles).pipe(
      switchMap(articles => {
        console.log(articles);
        console.log(id);
        let articleLoaded = articles?.find(article => article.id == id) != undefined;
        return of(articleLoaded);
      })
    );
  }
  
}
