import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, of, switchMap, tap } from "rxjs"
import { AuthService } from "src/app/services/auth.service"
import { CookieService } from "src/app/services/cookie.service"
import { ErrorHandlerService } from "src/app/services/error-handler.service"
import { AuthActions } from "./auth.actions"


@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private cookieService: CookieService,
        private router: Router,
        private errorHandler: ErrorHandlerService
    ) {}


    auth$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.authLogin),
            switchMap(authAction => 
                this.authService.auth(authAction.username, authAction.password).pipe(
                    map(response => AuthActions.authSuccess({token: response.data})),      
                    catchError(error => {
                        this.errorHandler.handleError(error);
                        return of(AuthActions.authFailure({ message: error }));
                    }),
                )
            )
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