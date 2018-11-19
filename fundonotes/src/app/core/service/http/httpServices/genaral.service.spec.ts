import { TestBed } from '@angular/core/testing';

import { GenaralService } from './genaral.service';

describe('GenaralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenaralService = TestBed.get(GenaralService);
    expect(service).toBeTruthy();
  });
});
