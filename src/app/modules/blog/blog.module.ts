import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './components/blog/blog.component';
import { SharedModule } from '../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { articleFeature } from 'src/app/state/article/article.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from 'src/app/state/article/article.effects';
import { QuillModule } from 'ngx-quill';
import { ArticleComponent } from './components/article/article.component';

@NgModule({
  declarations: [
    BlogComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    QuillModule.forRoot({modules: {syntax: true}, theme: 'snow'}),
    StoreModule.forFeature(articleFeature),
    EffectsModule.forFeature([ArticleEffects])
  ]
})
export class BlogModule { }
