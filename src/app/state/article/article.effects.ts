import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
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
            ofType(ArticleActions.getall), 
            switchMap(({offset, amount}) =>
                this.articleService.getArticles(offset, amount).pipe(
                    map(response => ArticleActions.getallSuccess({articles: response.data})),   
                    catchError(error => {
                        this.errorHandler.handleError(error);
                        return of(ArticleActions.getallFailure({ message: error }));
                    }),
                )
            )
        )
    )

    getArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.get), 
            switchMap(({id}) =>
                this.articleService.getArticle(id).pipe(
                    map(response => ArticleActions.getSuccess({article: response.data})),      
                    catchError(error => {
                        this.errorHandler.handleError(error);
                        return of(ArticleActions.getFailure({ message: error }));
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
                    map(response => ArticleActions.addSuccess({article: response.data})),
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
                    map(() => ArticleActions.deleteSuccess({id: id})),
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
                    map(() => ArticleActions.editSuccess({article: article})),
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
                    map((response) => {
                        return ArticleActions.publishSuccess({id: id, publish: publish, publishDate: response.data})
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