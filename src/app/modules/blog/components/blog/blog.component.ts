import { Component } from '@angular/core';
import { ArticleListComponent } from 'src/app/modules/shared/components/article-list/article-list.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent extends ArticleListComponent {

}
