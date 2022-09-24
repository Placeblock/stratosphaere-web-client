import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './components/blog/blog.component';
import { SharedModule } from '../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { articleFeature } from 'src/app/state/article/article.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from 'src/app/state/article/article.effects';

@NgModule({
  declarations: [
    BlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    StoreModule.forFeature(articleFeature),
    EffectsModule.forFeature([ArticleEffects])
  ]
})
export class BlogModule { }
