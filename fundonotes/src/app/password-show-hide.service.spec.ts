import { TestBed } from '@angular/core/testing';

import { PasswordShowHideService } from './password-show-hide.service';

describe('PasswordShowHideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordShowHideService = TestBed.get(PasswordShowHideService);
    expect(service).toBeTruthy();
  });
});
