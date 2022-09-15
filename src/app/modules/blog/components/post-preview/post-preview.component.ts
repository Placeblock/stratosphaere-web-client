import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {

  @Input() name: String = '';
  @Input() description: String = '';
  @Input() author: String = '';
  @Input() creationDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
