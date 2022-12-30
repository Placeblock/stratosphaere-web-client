import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ArticleMetadataComponent } from './components/article-metadata/article-metadata.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticlePreviewComponent } from '../blog/components/article-preview/article-preview.component';
import { ListControlComponent } from './components/list-control/list-control.component';

import { EditorComponent } from './components/editor/editor.component';
import { EditorContainerComponent } from './components/editor-container/editor-container.component';

import { QuillModule } from 'ngx-quill'
import { ContenteditableValueAccessorDirective } from 'src/app/directives/contenteditable-value-accessor.directive';

@NgModule({
  declarations: [
    ArticleMetadataComponent,
    ArticleListComponent,
    ArticlePreviewComponent,
    ListControlComponent,
    EditorComponent,
    EditorContainerComponent,
    ContenteditableValueAccessorDirective
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    QuillModule.forRoot({modules: {syntax: true}, theme: 'snow'})
  ]
})
export class BlogModule { }
