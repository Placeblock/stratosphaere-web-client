import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-creator-post-preview',
  templateUrl: './blog-creator-post-preview.component.html',
  styleUrls: ['./blog-creator-post-preview.component.scss']
})
export class BlogCreatorPostPreviewComponent implements OnInit {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() author: string = '';
  @Input() publishDate: Date = new Date();
  @Input() published: boolean = false;

  deleteCount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }
  
  delete() {
    this.deleteCount++;
    if (this.deleteCount == 5) {
      //TODO: DELETE
    }
  }

}
