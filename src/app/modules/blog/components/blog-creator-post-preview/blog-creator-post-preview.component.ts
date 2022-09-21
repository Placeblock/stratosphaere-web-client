import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-creator-post-preview',
  templateUrl: './blog-creator-post-preview.component.html',
  styleUrls: ['./blog-creator-post-preview.component.scss']
})
export class BlogCreatorPostPreviewComponent implements OnInit {
  @Input() uuid: string = '';
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() author: string = '';
  @Input() publishDate: Date = new Date();
  @Input() published: boolean = false;

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
