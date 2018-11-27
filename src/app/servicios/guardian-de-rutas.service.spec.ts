import { TestBed } from '@angular/core/testing';

import { GuardianDeRutasService } from './guardian-de-rutas.service';

describe('GuardianDeRutasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardianDeRutasService = TestBed.get(GuardianDeRutasService);
    expect(service).toBeTruthy();
  });
});
