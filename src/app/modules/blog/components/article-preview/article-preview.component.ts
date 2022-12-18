import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/classes/article';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {
  faTrash = 
  @Input() article!: Article;

  constructor() { }

  ngOnInit(): void {
  }

}
