import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';

@NgModule({
  declarations: [
    PostPreviewComponent,
    PageWrapperComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule, PostPreviewComponent, PageWrapperComponent
  ]
})
export class SharedModule { }
