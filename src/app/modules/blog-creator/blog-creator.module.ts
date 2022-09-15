import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogCreatorRoutingModule } from './blog-creator-routing.module';
import { BlogCreatorListComponent } from './components/blog-creator-list/blog-creator-list.component';
import { BlogCreatorPostPreviewComponent } from './components/blog-creator-post-preview/blog-creator-post-preview.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BlogCreatorListComponent,
    BlogCreatorPostPreviewComponent
  ],
  imports: [
    CommonModule,
    BlogCreatorRoutingModule,
    SharedModule
  ]
})
export class BlogCreatorModule { }
