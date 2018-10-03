import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
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


}
