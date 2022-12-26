import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMetadataComponent } from './article-metadata.component';

describe('ArticleMetadataComponent', () => {
  let component: ArticleMetadataComponent;
  let fixture: ComponentFixture<ArticleMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleMetadataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
