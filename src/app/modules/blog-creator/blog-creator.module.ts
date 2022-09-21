import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogCreatorRoutingModule } from './blog-creator-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BlogCreatorListComponent } from './components/blog-creator-list/blog-creator-list.component';
import { BlogCreatorPostPreviewComponent } from './components/blog-creator-post-preview/blog-creator-post-preview.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { QuillModule } from 'ngx-quill';
import { StoreModule } from '@ngrx/store';
import { articleFeature } from 'src/app/state/article.reducer';


@NgModule({
  declarations: [
    BlogCreatorListComponent,
    BlogCreatorPostPreviewComponent,
    PostEditComponent
  ],
  imports: [
    CommonModule,
    BlogCreatorRoutingModule,
    QuillModule.forRoot({modules: {syntax: true}, theme: 'snow'}),
    SharedModule,
    StoreModule.forFeature(articleFeature),
  ]
})
export class BlogCreatorModule { }
