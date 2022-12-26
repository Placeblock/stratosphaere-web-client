import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { EditorContainerComponent } from './components/editor-container/editor-container.component';

const routes: Routes = [
  { path: ':id', component: EditorContainerComponent},
  { path: '', component: ArticleListComponent},
  { path: '**', redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
