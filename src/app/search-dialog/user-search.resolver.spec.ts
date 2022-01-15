import { TestBed } from '@angular/core/testing';

import { UserSearchResolver } from './user-search.resolver';

describe('UserSearchResolver', () => {
  let resolver: UserSearchResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserSearchResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
