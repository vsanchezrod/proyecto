import { TestBed, inject } from '@angular/core/testing';

import { OpinionesService } from './opiniones.service';

describe('OpinionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpinionesService]
    });
  });

  it('should be created', inject([OpinionesService], (service: OpinionesService) => {
    expect(service).toBeTruthy();
  }));
});
