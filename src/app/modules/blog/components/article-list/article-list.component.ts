import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { exhaustMap, filter, first, fromEvent, map, Observable, Subscription } from 'rxjs';
import { APIResponse } from 'src/app/classes/apiresponse';
import { Article } from 'src/app/classes/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  showPublished: boolean = true;  
  showUnpublished: boolean = true;
  lastModified: number = 0;
  allLoaded: boolean = false;
  articles: Article[] = [];

  scrollSubscription: Subscription;

  constructor(private articleService: ArticleService, public authService: AuthService, private router: Router, private route: ActivatedRoute) {
      this.scrollSubscription = fromEvent(window, "scroll").pipe(
        filter(() => ((window.innerHeight + window.scrollY + 300) >= document.body.scrollHeight && !this.allLoaded)),
        exhaustMap(() => {
          return this.loadChunk(this.articles.length, 5)
        })
      ).subscribe();
    }
  
  ngOnInit(): void {
    this.resetList();
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
  }

  setShowPublished(event: boolean) {
    this.showPublished = event;
    this.resetList();
  }

  setShowUnpublished(event: boolean) {
    this.showUnpublished = event;
    this.resetList();
  }

  resetList() {
    this.articles = [];
    this.allLoaded = false;
    this.loadChunk(0, 5).subscribe();
  }

  deleteArticle(id: number) {
    console.log("DELETE ARTICLE")
    this.articleService.deleteArticle(id).pipe(
      map(() => {
        this.articles = [];
        this.loadChunk(0, this.articles.length).subscribe()
      }), first())
    .subscribe();
  }

  createArticle() {
    this.articleService.createArticle().pipe(first()).subscribe(result => {
      this.router.navigate([result.data.id], { relativeTo: this.route });
    });
  }

  loadChunk(offset: number, amount: number): Observable<number[]> {
    console.log("LOADING CHUNK: " + offset + " | " + amount);
    return new Observable((subscriber) => {
      this.articleService.getArticles(offset, amount, this.showPublished, this.showUnpublished)
      .subscribe(response => {
        if (offset > this.articles.length) {
          subscriber.complete();
          throw new Error("Tried to merge out of bound chunk! Articles: " + this.articles.length + " Offset: " + offset);
        }
        this.proccessChunk(offset, amount, response);
        subscriber.complete();
      });
    })
  }

  proccessChunk(offset: number, amount: number, response: HttpResponse<APIResponse<number[]>>) {
    let lastmodheader = response.headers.get("Last-Modified");
    if (lastmodheader != null) {
      let unixtimestamp = Date.parse(lastmodheader);
      if (offset != 0 && amount < this.articles.length && this.lastModified != 0 && unixtimestamp > this.lastModified) {
        console.log("RELOADING EVERYTHING")
        this.loadChunk(0, this.articles.length);
      }
      this.lastModified = unixtimestamp;
    }
    if (response.body != null) {
      let articleids = response.body.data;
      if (amount > articleids.length) {
        this.allLoaded = true;
      }
      for (let i = 0; i < articleids.length; i++) {
        let article = new Article(articleids[i], null, null, null, null, null, null, null, null);
        this.articles[i + offset] = article;
        this.loadMetadata(article);
      }
    }
  }

  loadMetadata(article: Article) {
    this.articleService.getArticle(article.id, ["title", "description", "author", "published", "publish_date"])
    .subscribe(res => {
      article.title = res.data.title;
      article.description = res.data.description;
      article.author = res.data.author;
      article.published = res.data.published;
      article.publish_date = res.data.publish_date;
    });
  }

}
