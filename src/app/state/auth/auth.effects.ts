import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, concatMap, exhaustMap, map, of, switchMap, tap } from "rxjs"
import { AuthService } from "src/app/services/auth.service"
import { CookieService } from "src/app/services/cookie.service"
import { AuthActions } from "./auth.actions"


@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private cookieService: CookieService,
        private router: Router
    ) {
        console.log("AUTH EFFECTS")
    }


    auth$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.authLogin),
            tap(() => console.log("AUTH ACTION")),
            switchMap(authAction => 
                this.authService.auth(authAction.username, authAction.password).pipe(
                    tap(response => {console.log(response.data)}),
                    map(response => AuthActions.authSuccess({token: response.data})),      
                )
            ),
            tap(console.log)
        )
    )

    authSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.authSuccess), 
            tap(({token}) => {
                this.cookieService.setCookie({name:"authToken",value:token,secure:true, expireDays:30})
            })
        ), 
        { dispatch: false }
    )

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authLogout), 
        tap(() => {
            this.cookieService.deleteCookie("authToken")
            this.router.navigate(["/"])
        })
    ), { dispatch: false })
}