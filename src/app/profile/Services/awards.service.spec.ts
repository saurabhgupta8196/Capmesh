import { TestBed, inject } from '@angular/core/testing';

import { AwardsService } from './awards.service';

describe('AwardsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AwardsService]
    });
  });

  it('should be created', inject([AwardsService], (service: AwardsService) => {
    expect(service).toBeTruthy();
  }));
});
