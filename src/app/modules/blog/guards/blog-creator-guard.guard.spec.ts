import { TestBed } from '@angular/core/testing';

import { BlogCreatorGuardGuard } from './blog-creator-guard.guard';

describe('BlogCreatorGuardGuard', () => {
  let guard: BlogCreatorGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BlogCreatorGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
