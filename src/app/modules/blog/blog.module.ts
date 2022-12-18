import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { articleFeature } from 'src/app/state/article/article.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from 'src/app/state/article/article.effects';
import { QuillModule } from 'ngx-quill';
import { ArticleComponent } from './components/article/article.component';
import { ArticleMetadataComponent } from './components/article-metadata/article-metadata.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticlePreviewComponent } from '../blog/components/article-preview/article-preview.component';
import { ListControlComponent } from './components/list-control/list-control.component';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleMetadataComponent,
    ArticleListComponent,
    ArticleEditComponent,
    ArticlePreviewComponent,
    ListControlComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    QuillModule.forRoot({}),
    StoreModule.forFeature(articleFeature),
    EffectsModule.forFeature([ArticleEffects])
  ]
})
export class BlogModule { }
