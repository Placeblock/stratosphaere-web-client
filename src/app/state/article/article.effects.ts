import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, withLatestFrom } from 'rxjs';
import { ArticleActions } from './article.actions';
import { ArticleService } from '../../services/article.service';
import {  } from '../../services/notification.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';


@Injectable()
export class ArticleEffects{

    constructor(
        private actions$: Actions,
        private articleService: ArticleService,
        private errorHandler: ErrorHandlerService
    ) {}

    getArticles$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.getchunk),
        )
    )

    getArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.getcontent), 
            switchMap(({id}) =>
                this.articleService.getArticle(id, []).pipe(
                    map(response => ArticleActions.getcontentSuccess({article: response.data})),      
                    catchError(error => {
                        this.errorHandler.handleError(error);
                        return of(ArticleActions.getchunkFailure({ message: error }));
                    }),
                )
            )
        )
    )

    addArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.add), 
            switchMap(() =>
                this.articleService.createArticle().pipe(
                    map(() => ArticleActions.addSuccess()),
                    catchError(error => {
                        this.errorHandler.handleError(error);
                        return of(ArticleActions.addFailure({ message: error }));
                    }),
                )
            )
        )
    )

    deleteArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.delete), 
            switchMap(({id}) =>
                this.articleService.deleteArticle(id).pipe(
                    map(() => ArticleActions.deleteSuccess()),
                    catchError(error => {
                        this.errorHandler.handleError(error);
                        return of(ArticleActions.deleteFailure({ message: error }));
                    }),
                )
            )
        )
    )

    editArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.edit),
            switchMap(({article}) => {
                return this.articleService.editArticle(article).pipe(
                    map(() => ArticleActions.editSuccess()),
                    catchError(error => {
                        this.errorHandler.handleError(error);
                        return of(ArticleActions.editFailure({ message: error }));
                    }),
                )
            })
        )
    )

    publishArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.publish),
            switchMap(({id, publish}) =>
                this.articleService.publishArticle(id, publish).pipe(
                    map(() => {
                        return ArticleActions.publishSuccess()
                    }),
                    catchError(error => {
                        this.errorHandler.handleError(error);
                        return of(ArticleActions.publishFailure({ message: error }));
                    }),
                )
            )
        )
    )

}