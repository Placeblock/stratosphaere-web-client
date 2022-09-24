import { Injectable } from "@angular/core"
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
        private cookieService: CookieService
    ) {
        super(notificationService)
    }

    auth$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.auth),
            exhaustMap(({username, password}) =>
                this.authService.auth(username, password).pipe(
                    map(response => AuthActions.authSuccess({token: response.data})),                    
                    catchError(error => {
                        this.handleError(error)
                        return of(AuthActions.authFailure({ message: error }))
                    }),
                )
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
        ofType(AuthActions.logout), 
        tap(() => {
            this.cookieService.deleteCookie("authToken")
        })
    ), { dispatch: false })
}