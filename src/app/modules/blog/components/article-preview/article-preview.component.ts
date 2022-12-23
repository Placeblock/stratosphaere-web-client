import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/classes/article';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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
  afterMathForm: FormControl = new FormControl(false)

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.article.id == 36) {
      this.showDeleteModal = true;
    }
  }

  closeModal() {
    this.afterMathForm.setValue(false);
    this.showDeleteModal = false;
  }

  delete() {
    if (this.afterMathForm.value == true) {
      this.closeModal();
      this.deleteEmitter.emit();
    }
  }

}
