import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Auth Login': props<{username: string, password: string}>(),
        'Auth Logout': emptyProps(),
        'Auth Success': props<{token: string}>(),
        'Auth Failure': props<{message: string}>(),
    }
})