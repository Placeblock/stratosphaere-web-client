import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { SortArticlesPipe } from 'src/app/pipes/sort-articles.pipe';

@NgModule({
  declarations: [
    PostPreviewComponent,
    PageWrapperComponent,
    SortArticlesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule, PostPreviewComponent, PageWrapperComponent, SortArticlesPipe
  ]
})
export class SharedModule { }
