import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatenschutzComponent } from './components/datenschutz/datenschutz.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'rechtliches', component: DatenschutzComponent,},
  { path: 'blog', loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)},
  { path: 'live', loadChildren: () => import('./modules/live/live.module').then(m => m.LiveModule)},
  { path: 'tools', loadChildren: () => import('./modules/tools/tools.module').then(m => m.ToolsModule)},
  { path: 'analysis', loadChildren: () => import('./modules/analysis/analysis.module').then(m => m.AnalysisModule)},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled', 
    onSameUrlNavigation: 'reload', 
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
