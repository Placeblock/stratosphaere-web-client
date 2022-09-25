import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, exhaustMap, map, of, tap } from "rxjs"
import { AuthService } from "src/app/services/auth.service"
import { CookieService } from "src/app/services/cookie.service"
import { NotificationService } from "src/app/services/notification.service"
import { ApiEffects } from "../apieffects"
import { AuthActions } from "./auth.actions"


@Injectable()
export class AuthEffects extends ApiEffects{

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        notificationService: NotificationService,
        private cookieService: CookieService,
        private router: Router
    ) {
        super(notificationService)
    }

    auth$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.auth),
            tap(action => console.log("AUTH ACTION")),
            exhaustMap(({username, password}) => {
                    console.log(username)
                    console.log(password)
                    return this.authService.auth(username, password).pipe(
                        tap(response => console.log(response)),
                        map(response => AuthActions.authSuccess({token: response.data})),                    
                        catchError(error => {
                            this.handleError(error)
                            return of(AuthActions.authFailure({ message: error }))
                        }),
                    )
                }   
            )
        )
    )

    authSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authSuccess), 
        tap(({token}) => {
            this.cookieService.setCookie({name:"authToken",value:token,secure:true, expireDays:30})
        })
    ), { dispatch: false })

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authLogout), 
        tap(() => {
            this.cookieService.deleteCookie("authToken")
            this.router.navigate(["/"])
        })
    ), { dispatch: false })
}