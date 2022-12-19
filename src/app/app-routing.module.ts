import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'blog/:id', loadChildren: () => import('./modules/blog-editor/blog-editor.module').then(m => m.BlogEditorModule)},
  { path: 'blog', loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
