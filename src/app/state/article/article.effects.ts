import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, mergeMap, of, switchMap, take, tap } from 'rxjs';
import { ArticleActions } from './article.actions';
import { ArticleService } from '../../services/article.service';
import { NotificationService } from '../../services/notification.service';
import { ApiEffects } from '../apieffects';


@Injectable()
export class ArticleEffects extends ApiEffects{

    constructor(
        private actions$: Actions,
        private articleService: ArticleService,
        notificationService: NotificationService
    ) {
        super(notificationService)
    }

    getArticles$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.getall), 
            exhaustMap(({offset, amount}) =>
                this.articleService.getArticles(offset, amount).pipe(
                    tap(response => {
                        console.log(response.data);
                        //console.log(new Date(response.data[0].publishDate*1000))
                    }),
                    map(response => ArticleActions.getallSuccess({articles: response.data})),                    
                    catchError(error => {
                        this.handleError(error)
                        return of(ArticleActions.getallFailure({ message: error }))
                    }),
                )
            )
        )
    )

    getArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.get), 
            exhaustMap(({id}) =>
                this.articleService.getArticle(id).pipe(
                    tap(response => {
                        console.log(response.data);
                    }),
                    map(response => ArticleActions.getSuccess({article: response.data})),                    
                    catchError(error => {
                        this.handleError(error)
                        return of(ArticleActions.getFailure({ message: error }))
                    }),
                )
            )
        )
    )

    addArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.add), 
            mergeMap(() =>
                this.articleService.createArticle().pipe(
                    map(response => ArticleActions.addSuccess({article: response.data})),
                    catchError(error => {
                        this.handleError(error)
                        return of(ArticleActions.addFailure({ message: error }))
                    }),
                )
            )
        )
    )

    deleteArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.delete), 
            concatMap(({id}) =>
                this.articleService.deleteArticle(id).pipe(
                    map(() => ArticleActions.deleteSuccess({id: id})),
                    catchError(error => {
                        this.handleError(error)
                        return of(ArticleActions.deleteFailure({ message: error }))
                    }),
                )
            )
        )
    )

    editArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.edit), 
            switchMap(({article}) =>
                this.articleService.editArticle(article).pipe(
                    map(() => ArticleActions.editSuccess({article: article})),
                    catchError(error => {
                        this.handleError(error)
                        return of(ArticleActions.editFailure({ message: error }))
                    }),
                )
            )
        )
    )

    publishArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.publish),
            switchMap(({id, publish}) =>
                this.articleService.publishArticle(id, publish).pipe(
                    map((response) => ArticleActions.publishSuccess({id: id, publish: publish, publishDate: response.data})),
                    catchError(error => {
                        this.handleError(error)
                        return of(ArticleActions.publishFailure({ message: error }))
                    }),
                )
            )
        )
    )

}