import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { ArticleActions } from './article.actions';
import { AppService } from '../services/app.service';
import { NotificationService } from '../services/notification.service';


@Injectable()
export class ArticleEffects {

    constructor(
        private actions$: Actions,
        private appService: AppService,
        private notificationService: NotificationService
    ) {}

    getArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.get), 
            concatMap(({id}) =>
                this.appService.getArticle(id).pipe(
                    map(response => ArticleActions.getSuccess({article: response.data})),
                    catchError(error => {
                        this.handleError(error)
                        return of(ArticleActions.getFailure({ message: error }))
                    }),
                )
            )
        )
    )

    getArticles$ = createEffect(() => 
        this.actions$.pipe(
            tap(e => console.log(e)),
            ofType(ArticleActions.getall), 
            exhaustMap(({offset, amount}) =>
                this.appService.getArticles(offset, amount).pipe(
                    map(response => ArticleActions.getallSuccess({articles: response.data})),                    
                    catchError(error => {
                        this.handleError(error)
                        return of(ArticleActions.getallFailure({ message: error }))
                    }),
                )
            )
        )
    )

    addArticle$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArticleActions.add), 
            mergeMap(() =>
                this.appService.createArticle().pipe(
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
                this.appService.deleteArticle(id).pipe(
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
                this.appService.editArticle(article).pipe(
                    map(() => ArticleActions.editSuccess({article: article})),
                    catchError(error => {
                        this.handleError(error)
                        return of(ArticleActions.editFailure({ message: error }))
                    }),
                )
            )
        )
    )

    handleError(error: any) :Observable<any> {
        console.log("ERROR: ")
        console.log(error)
        this.notificationService.error("Error", error, 5000)
        return of(error)
    }
}