import { TestBed } from '@angular/core/testing';

import { TagSearchResolver } from './tag-search.resolver';

describe('TagSearchResolver', () => {
  let resolver: TagSearchResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TagSearchResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
