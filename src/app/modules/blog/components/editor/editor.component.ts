import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import hljs from 'highlight.js'
import { debounceTime, distinctUntilChanged, first, skip, Subscription } from 'rxjs';
import { Article } from 'src/app/classes/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

hljs.configure({
  languages: ['javascript', 'typescript', 'html', 'css', 'typescript', 'scss', 'sql', 'JSON', 'go']
})

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit, OnDestroy {
  faEdit = faEdit;
  edit: boolean = false;
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

  showVisibilityModal: boolean = false;

  constructor(private fb: FormBuilder, private articleService: ArticleService, public authService: AuthService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      const articleID = params['id'];
      this.articleService.getArticle(articleID, ["id", "content", "publish_date", "title", "description", "author", "cover_image_url", "published"])
      .pipe(first()).subscribe(result => {
        this.editForm.patchValue(result.data, {emitEvent: false});
        this.article = result.data;
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

  ngOnDestroy(): void {
    this.autoSaveSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.autoSaveSubscription = this.editForm
    .valueChanges.pipe(
      debounceTime(1000),
      skip(1),
      distinctUntilChanged(),
    ).subscribe(() => {
      if (this.autoSave) {
        this.save();
      }
    })
  }

  visibility() {
    if (this.article == undefined) return;
    this.articleService.publishArticle(this.article.id, !this.article.published).pipe(first()).subscribe(result => {
      if (this.article == undefined) return;
      this.article.published = !this.article?.published;
      this.article.publish_date = result.data;
    });
  }

  save() {
    if (this.article != undefined && this.editForm.value != this.lastSaved) {
      this.lastSaved = this.editForm.value;
      this.article.title = this.editForm.value.title
      this.article.description = this.editForm.value.description
      this.article.content = this.editForm.value.content
      this.article.cover_image_url = this.editForm.value.cover_image_url
      this.editing = true;
      this.articleService.editArticle(this.article).pipe(first()).subscribe(() => {
        this.editing = false;
      });
    }
  }

  getVisibilityText(): string {
    return this.article?.published ? "Zurückziehen" : "Veröffentlichen"
  }
}