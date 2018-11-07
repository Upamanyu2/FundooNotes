import { TestBed } from '@angular/core/testing';

import { LabelServiceService } from './label-service.service';

describe('LabelServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabelServiceService = TestBed.get(LabelServiceService);
    expect(service).toBeTruthy();
  });
});
