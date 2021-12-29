import { TestBed } from '@angular/core/testing';

import { PictureListPageResolver } from './picture-list-page.resolver';

describe('PictureListPageResolver', () => {
  let resolver: PictureListPageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PictureListPageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
