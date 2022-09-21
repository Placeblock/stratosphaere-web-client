import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Article } from 'src/app/modules/blog/classes/article';
import { ArticleState } from 'src/app/modules/blog/state/article.reducer';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  articles$: Observable<Article[]>

  constructor(private store: Store<{article: ArticleState}>) {
    console.log(store);
    this.articles$ = store.select(state => state.article.articles)
  }

  ngOnInit(): void {
  }

}
