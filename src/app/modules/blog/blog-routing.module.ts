import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';

const routes: Routes = [
  { path: 'creator', loadChildren: () => import('../../modules/blog-creator/blog-creator.module').then(m => m.BlogCreatorModule)},
  { path: 'article/:uuid', component: BlogComponent},
  { path: '**', component: BlogComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
