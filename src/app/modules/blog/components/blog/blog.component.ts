import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Article } from 'src/app/classes/article';
import { ArticleState } from 'src/app/state/article.reducer';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

  articles$: Observable<Article[]>

  constructor(private store: Store<{article: ArticleState}>) {
    console.log(store);
    this.articles$ = store.select(state => state.article.articles)
  }

}
