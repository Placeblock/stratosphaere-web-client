import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ArticleMetadataComponent } from './components/article-metadata/article-metadata.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticlePreviewComponent } from '../blog/components/article-preview/article-preview.component';
import { ListControlComponent } from './components/list-control/list-control.component';

@NgModule({
  declarations: [
    ArticleMetadataComponent,
    ArticleListComponent,
    ArticlePreviewComponent,
    ListControlComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class BlogModule { }
