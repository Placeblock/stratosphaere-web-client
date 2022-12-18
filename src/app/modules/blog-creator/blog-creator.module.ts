import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogCreatorRoutingModule } from './blog-creator-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BlogCreatorListComponent } from './components/blog-creator-list/blog-creator-list.component';
import { BlogCreatorPostPreviewComponent } from './components/blog-creator-post-preview/blog-creator-post-preview.component';
import { QuillModule } from 'ngx-quill';
import { StoreModule } from '@ngrx/store';
import { articleFeature } from 'src/app/state/article/article.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from 'src/app/state/article/article.effects';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BlogCreatorListComponent,
    BlogCreatorPostPreviewComponent
  ],
  imports: [
    CommonModule,
    BlogCreatorRoutingModule,
    ReactiveFormsModule,
    QuillModule.forRoot({modules: {syntax: true}, theme: 'snow'}),
    SharedModule,
    StoreModule.forFeature(articleFeature),
    EffectsModule.forFeature([ArticleEffects])
  ]
})
export class BlogCreatorModule { }
