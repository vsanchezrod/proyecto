import { TestBed } from '@angular/core/testing';

import { CabecerasHttpService } from './cabeceras-http.service';

describe('CabecerasHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CabecerasHttpService = TestBed.get(CabecerasHttpService);
    expect(service).toBeTruthy();
  });
});
