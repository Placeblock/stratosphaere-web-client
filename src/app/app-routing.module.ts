import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'blog', loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)},
  { path: 'live', loadChildren: () => import('./modules/live/live.module').then(m => m.LiveModule)},
  { path: 'tools', loadChildren: () => import('./modules/tools/tools.module').then(m => m.ToolsModule)},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
