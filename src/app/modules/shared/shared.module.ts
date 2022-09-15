import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';



@NgModule({
  declarations: [
    PostPreviewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule, PostPreviewComponent
  ]
})
export class SharedModule { }
