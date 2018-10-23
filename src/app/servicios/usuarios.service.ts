import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
// Observables
import { BehaviorSubject, Observable } from 'rxjs';

// Componente
import { Usuario } from '../modelos/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private listaUsuarios: Array<Usuario> = [];
  private listaUsuarios$: BehaviorSubject<Array<Usuario>> = new BehaviorSubject<Array<Usuario>>(this.listaUsuarios);

  constructor(private httpClient: HttpClient) { }

  public obtenerListaUsuarios$(accessToken: string): Observable<Array<Usuario>> {

    this.httpClient.get<Array<Usuario>>('http://localhost:8080/fitness/api/usuarios',
      {headers: this.generarCabecerasConAccessTokenGet(accessToken), observe: 'response'}).subscribe( (response) => {
      this.listaUsuarios$.next(response.body);
      console.log('ServicioUsuario: ListaUsuarios: ', response.body);
    });
    return this.listaUsuarios$.asObservable();
  }

  public crearUsuario(usuario: Usuario): Observable<HttpResponse<Usuario>> {
    const body = usuario;
    return this.httpClient.post<Usuario>('http://localhost:8080/fitness/api/public/usuarios', body, {headers: this.generarCabecerasPost(), observe: 'response'});
  }

  public buscarUsuarioPorId(id: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`http://localhost:8080/fitness/api/public/usuarios/${id}`);
  }

  public buscarUsuarioPorNombre(nombre: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`http://localhost:8080/fitness/api/public/usuarios?nombre=${nombre}`);
  }

  private generarCabecerasPost(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  private generarCabecerasGet(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json'
    });
  }

  private generarCabecerasConAccessTokenGet(accessToken: string): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization' : `Bearer ${accessToken}`
    });
  }

}
