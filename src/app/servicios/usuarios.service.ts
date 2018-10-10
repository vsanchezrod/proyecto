import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Componente
import { Usuario } from '../modelos/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient) { }

  public obtenerListaUsuarios(): Observable<HttpResponse<Array<Usuario>>> {
    return this.httpClient.get<Array<Usuario>>('http://localhost:8080/fitness/api/public/usuarios', {observe: 'response'});
  }

  public crearUsuario(usuario: Usuario): Observable<HttpResponse<Usuario>> {

    const body = usuario;

    const cabeceras = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.httpClient.post<Usuario>('http://localhost:8080/fitness/api/public/usuarios', body, {observe: 'response'});
  }

  public obtenerUsuario(id): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`http://localhost:8080/fitness/api/public/usuarios/${id}`);
  }


}
