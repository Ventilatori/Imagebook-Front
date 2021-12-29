import { TestBed } from '@angular/core/testing';

import { PictureResolver } from './picture.resolver';

describe('PictureResolver', () => {
  let resolver: PictureResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PictureResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
