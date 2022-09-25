import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/classes/article';

@Component({
  selector: 'app-article-metadata',
  templateUrl: './article-metadata.component.html',
  styleUrls: ['./article-metadata.component.scss']
})
export class ArticleMetadataComponent implements OnInit {

  @Input() article!: Article;

  constructor() { }

  ngOnInit(): void {
  }

}
