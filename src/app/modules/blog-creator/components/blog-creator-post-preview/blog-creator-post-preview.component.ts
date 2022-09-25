import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/classes/article';

@Component({
  selector: 'app-blog-creator-post-preview',
  templateUrl: './blog-creator-post-preview.component.html',
  styleUrls: ['./blog-creator-post-preview.component.scss']
})
export class BlogCreatorPostPreviewComponent implements OnInit {
  @Input() article!: Article;
  @Output('visibility') visibilityChange = new EventEmitter<boolean>()
  @Output('delete') onDelete = new EventEmitter<any>()

  publishRevertCount: number = 0;
  deleteCount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  revert() {
    if (this.publishRevertCount == 4) {
      this.visibilityChange.emit(false)
      return;
    }
    this.publishRevertCount++;
  }
  
  publish() {
    if (this.publishRevertCount == 4) {
      this.visibilityChange.emit(true)
      return;
    }
    this.publishRevertCount++;
  }
  
  delete() {
    if (this.deleteCount == 4) {
      this.onDelete.emit()
      return;
    }
    this.deleteCount++;
  }

}
