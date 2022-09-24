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
    on(AuthActions.auth, state => ({...state, 
        authenticating: true
    })),
    on(AuthActions.logout, (state) => ({...state, 
        token: null,
        authenticating: false
    })),
    on(AuthActions.authSuccess, (state, {token}) => ({...state, 
        token: token,
        authenticating: false
    })),
    on(AuthActions.authFailure, (state, {message}) => ({...state,
        authenticating: false
    })),
)