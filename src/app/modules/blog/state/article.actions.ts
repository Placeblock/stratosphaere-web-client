import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article } from '../classes/article';

export const ArticleActions = createActionGroup({
    source: 'Article',
    events: {
        'Add': emptyProps(),
        'Add Success': props<{article: Article}>(),
        'Add Failure': props<{message: string}>(),

        'Delete': props<{id: number}>(),
        'Delete Success': props<{id: number}>(),
        'Delete Failure': props<{message: string}>(),

        'Edit': props<{article: Article}>(),
        'Edit Success': props<{article: Article}>(),
        'Edit Failure': props<{message: string}>(),

        'Get': props<{id: number}>(),
        'Get Success': props<{article: Article}>(),
        'Get Failure': props<{message: string}>(),

        'GetAll': props<{pageSize: number, page: number}>(),
        'GetAll Success': props<{articles: Article[]}>(),
        'GetAll Failure': props<{message: string}>(),
    }
})
