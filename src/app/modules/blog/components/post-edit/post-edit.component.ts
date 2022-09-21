import { Component, OnInit } from '@angular/core';
import 'quill-emoji/dist/quill-emoji.js'
import 'katex'
import hljs from 'highlight.js';

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'rust'],
})

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  modules = {}
  content = '';

  constructor() {
    this.modules = {
      'formula': true,
      'emoji-toolbar': true,
      'syntax': {
        highlight: (text: string) => hljs.highlightAuto(text).value,
      },
      'toolbar': [
        [{ 'font': [] }, { 'size': [] }],
        [ 'bold', 'italic', 'underline', 'strike' ],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'super' }, { 'script': 'sub' }],
        [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
        [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
        [ 'direction', { 'align': [] }],
        [ 'link', 'image', 'video', 'formula' ],
        [ 'clean' ],
        [ 'emoji' ]
      ]
    }
  }

  ngOnInit(): void {
  }

}
