import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ArticleState } from "./article.reducer";

export const selectArticle = createFeatureSelector<ArticleState>("article")

export const selectArticles = createSelector(
    selectArticle,
    (state: ArticleState) => state.articles
)

export const selectAllLoaded = createSelector(
    selectArticle,
    (state: ArticleState) => state.allLoaded
)