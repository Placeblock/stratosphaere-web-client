import { createFeature, createReducer, on } from "@ngrx/store";
import { ArticleActions } from "./article.actions";
import { Article } from "../../classes/article";

function randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export interface ArticleState {
    loading: boolean;
    loadingContent: boolean;
    editing: boolean;
    deleting: boolean;
    creating: boolean;
    publishing: boolean;

    allLoaded: boolean;

    articles: Article[];
    editArticle: Article | undefined;
}

export const initialState: ArticleState = {
    loading: false,
    loadingContent: false,
    editing: false,
    deleting: false,
    creating: false,
    publishing: false,

    allLoaded: false,

    articles: [],
    editArticle: undefined
}

export const articleFeature = createFeature({
    name: "article",
    reducer: createReducer(
        initialState,
        on(ArticleActions.add, state => ({...state, 
            creating: true
        })),
        on(ArticleActions.addSuccess, ArticleActions.addFailure, (state) => ({...state,
            creating: false
        })),
        on(ArticleActions.delete, state => ({...state, 
            deleting: true
        })),
        on(ArticleActions.deleteSuccess, ArticleActions.deleteFailure, (state) => ({...state, 
            deleting: false
        })),
        on(ArticleActions.edit, state => ({...state, 
            editing: true
        })),
        on(ArticleActions.editSuccess, ArticleActions.editFailure, (state) => ({...state,
            editing: false
        })),
        on(ArticleActions.publish, state => ({...state, 
            publishing: true
        })),
        on(ArticleActions.publishSuccess, ArticleActions.publishFailure, (state) => ({...state,
            publishing: false
        })),
        on(ArticleActions.getchunk, state => ({...state, 
            loading: true
        })),
        on(ArticleActions.getchunkSuccess, (state, {offset, amount, articles}) => {
            console.log(`loaded ${articles.length} of ${amount} requested Articles`)
            let newarticles: Article[] = [...articles];
            if (offset >= state.articles.length) {
                throw new Error("Tried to merge out of bound chunk! Articles: " + state.articles.length + " Offset: " + offset);
            }
            for (let i = 0; i < articles.length; i++) {
                newarticles[i + offset] = articles[i];
            }
            return { ...state, articles: newarticles, loading: false }
        }),
        on(ArticleActions.getchunkFailure, (state) => ({...state,
            loading: false
        })),
        on(ArticleActions.getcontent, (state, {}) => ({...state, 
            loadingSingle: true
        })),
        on(ArticleActions.getcontentFailure, (state, {}) => ({...state, 
            loadingSingle: false
        })),
        on(ArticleActions.getcontentSuccess, (state, {article}) => {
            let newarticles: Article[] = [...state.articles];
            for (let i = 0; i < newarticles.length; i++) {
                const art = newarticles[i];
                if (art.id == article.id) {
                    newarticles[i].content = article.content;
                }
            }
            return { ...state, articles: newarticles, loadingSingle: false }
        }),
        on(ArticleActions.getmetadataSuccess, (state, {article}) => {
            let newarticles: Article[] = [...state.articles];
            for (let i = 0; i < newarticles.length; i++) {
                const art = newarticles[i];
                if (art.id == article.id) {
                    newarticles[i] = article;
                }
            }
            return { ...state, articles: newarticles }
        }),
        on(ArticleActions.clear, (state) => ({...state,
            articles: []
        }))
    )
})
