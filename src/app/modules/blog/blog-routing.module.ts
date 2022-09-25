import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { BlogCreatorGuard } from './guards/blog-creator.guard';

const routes: Routes = [
  { path: 'creator', loadChildren: () => import('../../modules/blog-creator/blog-creator.module').then(m => m.BlogCreatorModule), canActivate: [BlogCreatorGuard]},
  { path: 'article/:id', component: BlogComponent},
  { path: '', component: BlogComponent},
  { path: '**', redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
