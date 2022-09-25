import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { AuthState } from 'src/app/state/auth/auth.reducer';
import { selectToken } from 'src/app/state/auth/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class BlogCreatorGuard implements CanActivate {

  constructor(private store: Store<{auth: AuthState}>, private router: Router) {

  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(selectToken).pipe(
      switchMap(token => {
        if (token == null) {
          this.router.navigate(['blog'])
        }
        return of(token != null)
      })
    );
  }
  
}
