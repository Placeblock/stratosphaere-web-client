import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/classes/article';

@Component({
  selector: 'app-blog-creator-post-preview',
  templateUrl: './blog-creator-post-preview.component.html',
  styleUrls: ['./blog-creator-post-preview.component.scss']
})
export class BlogCreatorPostPreviewComponent implements OnInit {
  @Input() article!: Article;

  publishRevertCount: number = 0;
  deleteCount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  revert() {
    if (this.publishRevertCount == 4) {
      //TODO: Revert
      return;
    }
    this.publishRevertCount++;
  }
  
  publish() {
    if (this.publishRevertCount == 4) {
      //TODO: Publish
      return;
    }
    this.publishRevertCount++;
  }
  
  delete() {
    if (this.deleteCount == 4) {
      //TODO: DELETE
      return;
    }
    this.deleteCount++;
  }

}
