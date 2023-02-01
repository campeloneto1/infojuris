import { TestBed } from '@angular/core/testing';

import { AlowedGuard } from './alowed.guard';

describe('AlowedGuard', () => {
  let guard: AlowedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlowedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
