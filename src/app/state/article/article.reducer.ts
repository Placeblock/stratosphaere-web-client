import { createFeature, createReducer, on } from "@ngrx/store";
import { ArticleActions } from "./article.actions";
import { Article } from "../../classes/article";

function randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export interface ArticleState {
    loading: boolean;
    editing: boolean;
    deleting: boolean;
    creating: boolean;
    publishing: boolean;

    articles: Article[] | null;
    editArticle: Article | undefined;
}

export const initialState: ArticleState = {
    loading: false,
    editing: false,
    deleting: false,
    creating: false,
    publishing: false,

    articles: null,
    editArticle: undefined
}

export const articleFeature = createFeature({
    name: "article",
    reducer: createReducer(
        initialState,
        on(ArticleActions.add, state => ({...state, 
            creating: true
        })),
        on(ArticleActions.addSuccess, (state, {article}) => ({...state, 
            articles: state.articles != null ? [...state.articles, article] : [article],
            creating: false
        })),
        on(ArticleActions.addFailure, (state) => ({...state,
            creating: false
        })),
        on(ArticleActions.delete, state => ({...state, 
            deleting: true
        })),
        on(ArticleActions.deleteSuccess, (state, {id}) => ({...state, 
            articles: state.articles != null ? state.articles.filter(article => article.id != id) : null,
            deleting: false
        })),
        on(ArticleActions.deleteFailure, (state) => ({...state,
            deleting: false
        })),
        on(ArticleActions.edit, state => ({...state, 
            editing: true
        })),
        on(ArticleActions.editSuccess, (state, {article}) => ({...state,
            articles: state.articles != null ? [...state.articles.filter(art => art.id != article.id), article] : null,
            editing: false
        })),
        on(ArticleActions.editFailure, (state) => ({...state,
            editing: false
        })),
        on(ArticleActions.publish, state => ({...state, 
            publishing: true
        })),
        on(ArticleActions.publishSuccess, (state, {id, publish, publishDate}) => ({
            ...state,
            articles: state.articles != null ? state.articles.map(
                    (article) => article.id == id ? {
                        ...article, 
                        published: publish, 
                        publishDate: publishDate
                    } : article
                ) : null
        })),
        on(ArticleActions.publishFailure, (state) => ({...state,
            publishing: false
        })),
        on(ArticleActions.getall, state => ({...state, 
            loading: true
        })),
        on(ArticleActions.getallSuccess, (state, {articles}) => ({...state, 
            articles: state.articles != null ? state.articles.concat(articles.filter(art => {!(art.id in articles.map(artic => artic.id))})) : articles,
            loading: false
        })),
        on(ArticleActions.getallFailure, (state) => ({...state,
            loading: false
        })),
        on(ArticleActions.getSuccess, (state, {article}) => ({...state, 
            articles: state.articles != null ? state.articles.find(art => art.id == article.id) == undefined ? [...state.articles, article] : state.articles : [article],
            loading: false
        })),
    )
})