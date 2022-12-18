import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map } from 'rxjs';
import { Article } from 'src/app/classes/article';
import { ArticleState } from 'src/app/state/article/article.reducer';
import { selectArticles } from 'src/app/state/article/article.selector';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  
  article: Article | undefined;
  articles$;
  modules = {}

  constructor(private activatedRoute: ActivatedRoute, private store: Store<{article: ArticleState}>) {
    this.articles$ = this.store.select(selectArticles)
    this.modules = {
      'formula': true,
      'toolbar': false
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const articleID = params['id'];
      this.articles$.pipe(
        first(),
        map(articles => {
          let article = articles?.find(article => article.id == articleID)
          this.article = article;
        })
      ).subscribe()
    });
  }

}
