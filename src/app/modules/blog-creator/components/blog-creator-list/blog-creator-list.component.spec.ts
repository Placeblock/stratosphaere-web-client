import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCreatorListComponent } from './blog-creator-list.component';

describe('BlogCreatorListComponent', () => {
  let component: BlogCreatorListComponent;
  let fixture: ComponentFixture<BlogCreatorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCreatorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCreatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
