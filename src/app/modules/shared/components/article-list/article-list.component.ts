import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Article } from 'src/app/classes/article';
import { ArticleActions } from 'src/app/state/article.actions';
import { ArticleState } from 'src/app/state/article.reducer';
import { selectArticles } from 'src/app/state/article.selector';

@Component({
  selector: 'app-article-list',
  template: '',
  styleUrls: []
})
export class ArticleListComponent implements OnInit {

  articles$: Observable<Article[] | null>

  constructor(private store: Store<{article: ArticleState}>) {
    console.log(store);
    this.articles$ = store.select(selectArticles)
  }

  ngOnInit(): void {
    this.articles$.subscribe(articles => {
      console.log("NG ON INIT ARTICLES")
      if (articles == undefined) {
        this.store.dispatch(ArticleActions.getall({offset: 0, amount: 5}))
      }
    })
  }

}
