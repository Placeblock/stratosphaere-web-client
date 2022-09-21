import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCreatorPostPreviewComponent } from './blog-creator-post-preview.component';

describe('BlogCreatorPostPreviewComponent', () => {
  let component: BlogCreatorPostPreviewComponent;
  let fixture: ComponentFixture<BlogCreatorPostPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCreatorPostPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCreatorPostPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
