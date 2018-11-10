import { Injectable } from '@angular/core';

// Cabeceras
import { HttpHeaders } from '@angular/common/http';

// Servicio
import { UsuarioSesionService } from './usuario-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class CabecerasHttpService {

  private accessToken: string;

  constructor(private usuarioSesionService: UsuarioSesionService) {

    this.accessToken = '';
    // Obtener token de acceso
    this.usuarioSesionService.obtenerAccessToken$().subscribe(accessToken => {
      this.accessToken = accessToken;
    });

  }

  public generarCabecerasGet(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json'
    });
  }

  public generarCabecerasPost(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  public generarCabecerasGetConAccessToken(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization' : `Bearer ${this.accessToken}`
    });
  }

  public generarCabecerasPostPutPatchConAccessToken(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : `Bearer ${this.accessToken}`
    });
  }

}
