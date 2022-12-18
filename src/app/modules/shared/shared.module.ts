import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { SortArticlesPipe } from 'src/app/pipes/sort-articles.pipe';
import { FilterPublishedPipe } from 'src/app/pipes/filter-published.pipe';

@NgModule({
  declarations: [
    PageWrapperComponent,
    SortArticlesPipe,
    FilterPublishedPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule, PageWrapperComponent, SortArticlesPipe, FilterPublishedPipe,
  ]
})
export class SharedModule { }
