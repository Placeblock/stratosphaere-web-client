import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, concatMap, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { ArticleActions } from './article.actions';
import { Article } from '../classes/article';
import { AppService } from '../services/app.service';


@Injectable()
export class ArticleEffects {

    constructor(
        private actions$: Actions,
        private appService: AppService
    ) {}

    getArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.get), 
            concatMap(({id}) =>
                this.appService.getArticle(id).pipe(
                    map(article => ArticleActions.getSuccess({article: article})),
                    catchError(error => of(ArticleActions.getFailure({ message: error })))
                )
            )
        )
    )

    getArticles$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.getall), 
            exhaustMap(({pageSize, page}) =>
                this.appService.getArticles(pageSize, page).pipe(
                    map(articles => ArticleActions.getallSuccess({articles: articles})),
                    catchError(error => of(ArticleActions.getallFailure({ message: error })))
                )
            )
        )
    )

    addArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.add), 
            mergeMap(() =>
                this.appService.createArticle().pipe(
                    map(article => ArticleActions.addSuccess({article: article})),
                    catchError(error => of(ArticleActions.addFailure({ message: error })))
                )
            )
        )
    )

    deleteArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.delete), 
            concatMap(({id}) =>
                this.appService.deleteArticle(id).pipe(
                    map(() => ArticleActions.deleteSuccess({id: id})),
                    catchError(error => of(ArticleActions.deleteFailure({ message: error })))
                )
            )
        )
    )

    editArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.edit), 
            switchMap(({article}) =>
                this.appService.editArticle(article).pipe(
                    map(() => ArticleActions.editSuccess({article: article})),
                    catchError(error => of(ArticleActions.editFailure({ message: error })))
                )
            )
        )
    )

}