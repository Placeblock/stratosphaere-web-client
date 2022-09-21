import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './components/blog/blog.component';
import { SharedModule } from '../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BlogCreatorListComponent } from './components/blog-creator-list/blog-creator-list.component';
import { BlogCreatorPostPreviewComponent } from './components/blog-creator-post-preview/blog-creator-post-preview.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { QuillModule } from 'ngx-quill';
import { articleFeature } from 'src/app/modules/blog/state/article.reducer';
import { SortArticlesPipe } from './pipes/sort-articles.pipe';

@NgModule({
  declarations: [
    BlogComponent,
    BlogCreatorListComponent,
    BlogCreatorPostPreviewComponent,
    PostEditComponent,
    SortArticlesPipe
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    QuillModule.forRoot({modules: {syntax: true}, theme: 'snow'}),
    SharedModule,
    EffectsModule,
    StoreModule.forFeature(articleFeature),
  ]
})
export class BlogModule { }
