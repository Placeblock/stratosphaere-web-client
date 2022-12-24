import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import hljs from 'highlight.js'
import { debounceTime, distinctUntilChanged, first, skip, Subscription } from 'rxjs';
import { Article } from 'src/app/classes/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import BlotFormatter from 'quill-blot-formatter';
import Quill from 'quill';
import { CustomImage, CustomVideo, getEditorModules, getViewModules } from 'src/app/classes/editor';

import QuillImageDropAndPaste, { ImageData as QuillImageData } from 'quill-image-drop-and-paste';

Quill.register('modules/blotFormatter', BlotFormatter);
Quill.register('formats/video', CustomVideo);
Quill.register('formats/image', CustomImage);
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit, OnDestroy {
  faEdit = faEdit;
  edit: boolean = false;
  editorModules = {};
  viewModules = {};
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

  quill!: Quill;

  showVisibilityModal: boolean = false;

  constructor(private fb: FormBuilder, private articleService: ArticleService, public authService: AuthService, private activatedRoute: ActivatedRoute) {
    hljs.configure({
      languages: ['javascript', 'typescript', 'html', 'css', 'typescript', 'scss', 'sql', 'JSON', 'go']
    })
    this.activatedRoute.params.subscribe(params => {
      const articleID = params['id'];
      this.articleService.getArticle(articleID, ["id", "content", "publish_date", "title", "description", "author", "cover_image_url", "published"])
      .pipe(first()).subscribe(result => {
        this.editForm.patchValue(result.data, {emitEvent: false});
        this.article = result.data;
      })
    });
    this.editorModules = {...getEditorModules(), "imageDropAndPaste": {"handler": this.imageHandler.bind(this)}};
    this.viewModules = getViewModules();
  }

  editorCreated(quill: Quill) {
    this.quill = quill;
    quill.getModule("toolbar").addHandler("image", this.selectLocalImage.bind(this));
  }

  selectLocalImage() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();
    var _me = this;
    input.onchange = function() {
      if (input.files == null) return;
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        _me.saveToServer(file);
      }
    }
  }

  saveToServer(file: File) {
    this.articleService.uploadImage(file).pipe(first()).subscribe(result => {
      console.log(result);
      this.insertToEditor(result.data);
    })
  }

  insertToEditor(url: string) {
    // push image url to rich editor.
    const range = this.quill.getSelection();
    if (range == null) return;
    this.quill.insertEmbed(range.index, 'image', url);
  }

  imageHandler(dataUrl: string, type: string, imageData: any) {
    imageData
      .minify({
        maxWidth: 1280,
        maxHeight: 1280,
        quality: 0.7,
      })
      .then((miniImageData: any) => {
        const file: File | null = miniImageData.toFile(miniImageData["name"]);
        if (file == null) return;
        this.saveToServer(file);
      });
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