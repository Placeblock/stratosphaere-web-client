import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './components/editor/editor.component';
import { EditorContainerComponent } from './components/editor-container/editor-container.component';
import { SharedModule } from '../shared/shared.module';

import { BlogEditorRoutingModule } from './blog-editor-routing.module';



@NgModule({
  declarations: [
    EditorComponent,
    EditorContainerComponent
  ],
  imports: [
    CommonModule,
    BlogEditorRoutingModule,
    SharedModule
  ]
})
export class BlogEditorModule { }
