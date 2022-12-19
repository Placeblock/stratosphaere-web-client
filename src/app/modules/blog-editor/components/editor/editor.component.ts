import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import { getEditorSchema } from 'src/app/classes/editor-schema';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('content') content: any;

  schema = getEditorSchema();
  state: EditorState = EditorState.create({schema: this.schema});
  view: EditorView | null = null;

  ngAfterViewInit(): void {
    this.view = new EditorView(this.content.nativeElement, {state: this.state})
  }

}
