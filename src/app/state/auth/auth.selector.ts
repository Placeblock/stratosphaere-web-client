import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AuthState } from "./auth.reducer"


export const selectAuth = createFeatureSelector<AuthState>("auth")

export const selectToken = createSelector(
    selectAuth,
    (state: AuthState) => state.token
)