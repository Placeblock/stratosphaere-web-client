import { Component, OnDestroy, OnInit } from '@angular/core';
import 'katex'
import hljs from 'highlight.js';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, first, map, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectArticles } from 'src/app/state/article/article.selector';
import { ArticleState } from 'src/app/state/article/article.reducer';
import { Article } from 'src/app/classes/article';
import { ArticleActions } from 'src/app/state/article/article.actions';


hljs.configure({
  languages: ['javascript', 'typescript', 'html', 'css', 'typescript', 'scss', 'sql', 'JSON', 'go']
})

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit, OnDestroy {
  modules = {}
  content = '';
  editForm: FormGroup;
  articles$;
  article: Article | undefined;
  autoSave: boolean = true;
  autoSaveSubscription: Subscription | undefined
  lastSaved: any;
  editing$


  constructor(fb: FormBuilder, private activatedRoute: ActivatedRoute, private store: Store<{article: ArticleState}>) {
    this.articles$ = store.select(selectArticles)
    this.editing$ = store.select(store => store.article.editing);
    this.editForm = fb.group({
      content: [''],
      title: [''],
      description: [''],
      cover_image_url: ['']
    })
    this.modules = {
      'formula': true,
      'syntax': {
        highlight: (text: string) => hljs.highlightAuto(text).value,
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
        ],
        'handlers': {
          image: this.imageHandler
        }
      }
    }
  }

  imageHandler(this: any) {
    const tooltip = this.quill.theme.tooltip;
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;
    tooltip.save = function(this: any) {
      const range = this.quill.getSelection(true);
      const value = this.textbox.value;
      if (value) {
        this.quill.insertEmbed(range.index, 'image', value, 'user');
      }
    };
    // Called on hide and save.
    tooltip.hide = function (this: any) {
       tooltip.save = originalSave;
       tooltip.hide = originalHide;
       tooltip.hide();
    };
    tooltip.edit('image');
    tooltip.textbox.placeholder = "Embed URL";
  }

  ngOnInit(): void {
    this.autoSaveSubscription = this.editForm
    .valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    )
    .subscribe(() => {
      if (this.autoSave) {
        this.save();
      }
    })
    this.activatedRoute.params.subscribe(params => {
      const articleID = params['id'];
      this.articles$.pipe(
        first(),
        map(articles => {
          let article = articles?.find(article => article.id == articleID)
          if (article != undefined) {
            this.editForm.get('title')?.setValue(article.title)
            this.editForm.get('description')?.setValue(article.description)
            this.editForm.get('content')?.setValue(article.content)
            this.editForm.get('cover_image_url')?.setValue(article.cover_image_url)
          }
          this.article = article;
        })
      ).subscribe()
    });
  }

  ngOnDestroy(): void {
    this.autoSaveSubscription?.unsubscribe()
  }

  save() {
    console.log("SAVE")
    if (this.article != undefined && this.editForm.value != this.lastSaved) {
      this.lastSaved = this.editForm.value;
      let title = this.editForm.get('title')?.value
      let description = this.editForm.get('description')?.value
      let content = this.editForm.get('content')?.value
      let cover_image_url = this.editForm.get('cover_image_url')?.value
      this.store.dispatch(ArticleActions.edit({article: {...this.article, 
        title: title, 
        content: content, 
        description: description, 
        cover_image_url: cover_image_url}}))
    }
  }

}
