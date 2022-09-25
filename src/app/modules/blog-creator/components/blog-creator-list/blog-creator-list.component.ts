import { Component } from '@angular/core';
import { Article } from 'src/app/classes/article';
import { ArticleListComponent } from 'src/app/modules/shared/components/article-list/article-list.component';
import { ArticleActions } from 'src/app/state/article/article.actions';

@Component({
  selector: 'app-blog-creator-list',
  templateUrl: './blog-creator-list.component.html',
  styleUrls: ['./blog-creator-list.component.scss']
})
export class BlogCreatorListComponent extends ArticleListComponent {

  createArticle() {
    this.store.dispatch(ArticleActions.add())
  }

  changeVisibility(article: Article, isPublish: boolean) {
    this.store.dispatch(ArticleActions.publish({id: article.id, publish: isPublish}))
  }

  deleteArticle(id: number) {
    this.store.dispatch(ArticleActions.delete({id: id}))
  }

}
