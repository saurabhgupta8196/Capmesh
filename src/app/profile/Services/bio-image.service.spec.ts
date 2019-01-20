import { TestBed, inject } from '@angular/core/testing';

import { BioImageService } from './bio-image.service';

describe('BioImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BioImageService]
    });
  });

  it('should be created', inject([BioImageService], (service: BioImageService) => {
    expect(service).toBeTruthy();
  }));
});
