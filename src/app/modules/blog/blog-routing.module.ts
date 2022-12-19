import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';

const routes: Routes = [
  //{ path: 'creator', loadChildren: () => import('../../modules/blog-creator/blog-creator.module').then(m => m.BlogCreatorModule), canActivate: [BlogCreatorGuard]},
  //{ path: 'article/:id', component: ArticleComponent, canActivate: [ArticleGuard], data: {redirectUrl: ['blog'], loadedUrl: "/blog/article/"}},
  { path: '', component: ArticleListComponent},
  { path: '**', redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
