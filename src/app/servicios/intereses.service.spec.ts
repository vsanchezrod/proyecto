import { TestBed, inject } from '@angular/core/testing';

import { InteresesService } from './intereses.service';

describe('InteresesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InteresesService]
    });
  });

  it('should be created', inject([InteresesService], (service: InteresesService) => {
    expect(service).toBeTruthy();
  }));
});
