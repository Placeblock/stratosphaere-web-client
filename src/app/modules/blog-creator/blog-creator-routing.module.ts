import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogCreatorListComponent } from './components/blog-creator-list/blog-creator-list.component';
import { PostEditComponent } from '../blog/components/article-edit/article-edit.component';
import { ArticleGuard } from '../shared/guards/article.guard';

const routes: Routes = [
  { path: 'edit/:id', component: PostEditComponent, canActivate: [ArticleGuard], data: {redirectUrl: ['blog', 'creator'], loadedUrl: "/blog/creator/edit/"}},
  { path: '', component: BlogCreatorListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogCreatorRoutingModule { }
