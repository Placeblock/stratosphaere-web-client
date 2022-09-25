import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthActions } from "./auth.actions";

export interface AuthState {
    authenticating: boolean;
    token: string | null;
}

export const initialState: AuthState = {
    authenticating: true,
    token: null
}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.authLogin, state => ({...state, 
        authenticating: true
    })),
    on(AuthActions.authLogout, (state) => ({...state, 
        token: null,
    })),
    on(AuthActions.authSuccess, (state, {token}) => ({...state, 
        token: token,
        authenticating: false
    })),
    on(AuthActions.authFailure, (state, {message}) => ({...state,
        authenticating: false
    })),
)