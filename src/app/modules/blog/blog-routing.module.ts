import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleGuard } from '../shared/guards/article.guard';
import { ArticleComponent } from './components/article/article.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogCreatorGuard } from './guards/blog-creator.guard';

const routes: Routes = [
  { path: 'creator', loadChildren: () => import('../../modules/blog-creator/blog-creator.module').then(m => m.BlogCreatorModule), canActivate: [BlogCreatorGuard]},
  { path: 'article/:id', component: ArticleComponent, canActivate: [ArticleGuard], data: {redirectUrl: ['blog']}},
  { path: '', component: BlogComponent},
  { path: '**', redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
