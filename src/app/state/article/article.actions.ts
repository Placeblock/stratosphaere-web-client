import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article } from '../../classes/article';

export const ArticleActions = createActionGroup({
    source: 'Article',
    events: {
        'Add': emptyProps(),
        'Add Success': emptyProps(),
        'Add Failure': props<{message: string}>(),

        'Delete': props<{id: number}>(),
        'Delete Success': emptyProps(),
        'Delete Failure': props<{message: string}>(),

        'Edit': props<{article: Article}>(),
        'Edit Success': emptyProps(),
        'Edit Failure': props<{message: string}>(),

        'Publish': props<{id: number, publish: boolean}>(),
        'Publish Success': emptyProps(),
        'Publish Failure': props<{message: string}>(),

        'GetMetadata': props<{id: number}>(),
        'GetMetadata Success': props<{article: Article}>(),
        'GetMetadata Failure': props<{message: string}>(),

        'GetContent': props<{id: number}>(),
        'GetContent Success': props<{article: Article}>(),
        'GetContent Failure': props<{message: string}>(),

        'GetChunk': props<{offset: number, amount: number, showUnpublished: boolean, showPublished: boolean}>(),
        'GetChunk Success': props<{offset: number, amount: number, articles: Article[]}>(),
        'GetChunk Failure': props<{message: string}>(),

        'Reload': emptyProps(),
        'Clear': emptyProps(),
    }
})
