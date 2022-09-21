import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostEditGuardGuard } from 'src/app/modules/blog/guards/post-edit-guard.guard';
import { BlogCreatorListComponent } from './components/blog-creator-list/blog-creator-list.component';
import { BlogComponent } from './components/blog/blog.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';

const routes: Routes = [
  { path: 'creator', component: BlogCreatorListComponent},
  { path: 'creator/edit/:uuid', component: PostEditComponent, canActivate: [PostEditGuardGuard]},
  { path: '**', component: BlogComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
