import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/classes/article';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {
  faTrash = faTrash

  @Input() article!: Article;
  @Output("delete") deleteEmitter = new EventEmitter<void>();

  showDeleteModal: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    if (this.article.id == 36) {
      this.showDeleteModal = true;
    }
  }

}
