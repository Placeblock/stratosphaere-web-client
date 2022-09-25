import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { SortArticlesPipe } from 'src/app/pipes/sort-articles.pipe';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleMetadataComponent } from './components/article-metadata/article-metadata.component';

@NgModule({
  declarations: [
    PostPreviewComponent,
    PageWrapperComponent,
    SortArticlesPipe,
    ArticleListComponent,
    ArticleMetadataComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule, PostPreviewComponent, PageWrapperComponent, SortArticlesPipe, ArticleListComponent, ArticleMetadataComponent
  ]
})
export class SharedModule { }
