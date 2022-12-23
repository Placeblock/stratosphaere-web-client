import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import hljs from 'highlight.js'
import { debounceTime, distinctUntilChanged, first, Subscription } from 'rxjs';
import { Article } from 'src/app/classes/article';
import { ArticleService } from 'src/app/services/article.service';

hljs.configure({
  languages: ['javascript', 'typescript', 'html', 'css', 'typescript', 'scss', 'sql', 'JSON', 'go']
})

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  faEdit = faEdit;
  edit: boolean = true;
  modules = {};
  editForm: FormGroup = this.fb.group({
    content: [''],
    title: [''],
    description: [''],
    cover_image_url: ['']
  });  
  article: Article | undefined;
  editing: boolean = false;
  autoSave: boolean = true;
  autoSaveSubscription: Subscription | undefined
  lastSaved!: string;

  constructor(private fb: FormBuilder, private articleService: ArticleService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      const articleID = params['id'];
      this.articleService.getArticle(articleID, ["id", "content", "publish_date", "title", "description", "author", "cover_image_url", "published"])
      .pipe(first()).subscribe(result => {
        console.log(result.data);
        this.article = result.data;
        this.editForm.controls["content"].setValue(this.article.content);
        this.editForm.controls["title"].setValue(this.article.title);
        this.editForm.controls["description"].setValue(this.article.description);
        this.editForm.controls["cover_image_url"].setValue(this.article.cover_image_url);
      })
    });
    this.modules = {
      'formula': true,
      'syntax': {
        highlight: (text: string) => {
          return hljs.highlightAuto(text).value;
        },
      },
      'toolbar': {
        container: [[{ 'font': [] }, { 'size': [] }],
          [ 'bold', 'italic', 'underline', 'strike' ],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'super' }, { 'script': 'sub' }],
          [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
          [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
          [ 'direction', { 'align': [] }],
          [ 'link', 'image', 'video', 'formula' ],
          [ 'clean' ]
        ]
      }
    }
  }

  ngOnInit(): void {
    this.autoSaveSubscription = this.editForm
    .valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    )
    .subscribe(() => {
      if (this.autoSave) {
        //this.save();
      }
    })
  }

  save() {
    if (this.article != undefined && this.editForm.value != this.lastSaved) {
      this.lastSaved = this.editForm.value;
      let title = this.editForm.value.title
      let description = this.editForm.value.description
      let content = this.editForm.value.content
      let cover_image_url = this.editForm.value.cover_image_url
      this.editing = true;
      this.articleService.editArticle({...this.article, 
        title: title, 
        content: content, 
        description: description, 
        cover_image_url: cover_image_url}
      ).pipe(first()).subscribe(() => {
        this.editing = false;
      });
    }
  }
}