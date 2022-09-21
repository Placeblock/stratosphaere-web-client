import { TestBed } from '@angular/core/testing';

import { PostEditGuardGuard } from './post-edit-guard.guard';

describe('PostEditGuardGuard', () => {
  let guard: PostEditGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PostEditGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
