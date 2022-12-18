import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { SortArticlesPipe } from 'src/app/pipes/sort-articles.pipe';
import { FilterPublishedPipe } from 'src/app/pipes/filter-published.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    PageWrapperComponent,
    SortArticlesPipe,
    FilterPublishedPipe,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    CommonModule, PageWrapperComponent, SortArticlesPipe, FilterPublishedPipe, FontAwesomeModule, ModalComponent
  ]
})
export class SharedModule { }
