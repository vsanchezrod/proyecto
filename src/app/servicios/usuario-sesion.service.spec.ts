import { TestBed, inject } from '@angular/core/testing';

import { UsuarioSesionService } from './usuario-sesion.service';

describe('UsuarioSesionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioSesionService]
    });
  });

  it('should be created', inject([UsuarioSesionService], (service: UsuarioSesionService) => {
    expect(service).toBeTruthy();
  }));
});
