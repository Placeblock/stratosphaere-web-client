import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { ArticleState } from 'src/app/state/article/article.reducer';
import { selectArticles } from 'src/app/state/article/article.selector';

@Injectable({
  providedIn: 'root'
})
export class PostEditGuardGuard implements CanActivate {

  constructor(private store: Store<{article: ArticleState}>, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!("id" in route.params)) {
      this.router.navigate(["blog", "creator"])
      return false;
    }
    return this.store.select(selectArticles).pipe(
      switchMap(articles => {
        let articleLoaded = articles?.find(article => article.id == route.params["id"]) != undefined;
        if (!articleLoaded) {
          this.router.navigate(["blog", "creator"])
        }
        return of(articleLoaded)
      })
    );
  }
  
}
