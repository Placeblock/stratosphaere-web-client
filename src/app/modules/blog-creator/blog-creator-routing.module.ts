import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogCreatorListComponent } from './components/blog-creator-list/blog-creator-list.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { PostEditGuardGuard } from './guards/post-edit-guard.guard';

const routes: Routes = [
  { path: 'edit/:uuid', component: PostEditComponent, canActivate: [PostEditGuardGuard]},
  { path: '', component: BlogCreatorListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogCreatorRoutingModule { }
