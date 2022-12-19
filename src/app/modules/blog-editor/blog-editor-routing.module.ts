import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorContainerComponent } from './components/editor-container/editor-container.component';

const routes: Routes = [
  { path: '', component: EditorContainerComponent},
  { path: '**', redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogEditorRoutingModule { }
