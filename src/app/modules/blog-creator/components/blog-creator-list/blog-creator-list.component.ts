import { Component } from '@angular/core';
import { ArticleListComponent } from 'src/app/modules/shared/components/article-list/article-list.component';

@Component({
  selector: 'app-blog-creator-list',
  templateUrl: './blog-creator-list.component.html',
  styleUrls: ['./blog-creator-list.component.scss']
})
export class BlogCreatorListComponent extends ArticleListComponent {

}
