import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
// Observables
import { BehaviorSubject, Subject, Observable } from 'rxjs';

// Componente
import { Usuario } from '../modelos/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private listaUsuarios: Array<Usuario> = [];
  private listaUsuarios$: BehaviorSubject<Array<Usuario>> = new BehaviorSubject<Array<Usuario>>(this.listaUsuarios);

  private numeroUsuarios = 0;
  private numeroUsuarios$: BehaviorSubject<number> = new BehaviorSubject<number>(this.numeroUsuarios);

  private usuarioCreacion = new Usuario();
  private usuarioCreacion$: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(this.usuarioCreacion);

  constructor(private httpClient: HttpClient) { }

  public obtenerListaUsuarios$(accessToken: string): Observable<Array<Usuario>> {

    this.httpClient.get<Array<Usuario>>('http://localhost:8080/fitness/api/usuarios',
      {headers: this.generarCabecerasGetConAccessToken(accessToken), observe: 'response'}).subscribe( (response) => {
      this.listaUsuarios$.next(response.body);
      console.log('ServicioUsuario: ListaUsuarios: ', response.body);
    });
    return this.listaUsuarios$.asObservable();
  }

  public crearUsuario(usuario: Usuario): Observable<HttpResponse<Usuario>> {
    return this.httpClient.post<Usuario>('http://localhost:8080/fitness/api/public/usuarios', usuario, {headers: this.generarCabecerasPost(), observe: 'response'});
  }

  public buscarUsuarioPorId(id: string): Observable<Usuario> {
    this.httpClient.get<Usuario>(`http://localhost:8080/fitness/api/public/usuarios/${id}`,
      {headers: this.generarCabecerasGet(), observe: 'response'}).subscribe ( response => {
        this.usuarioCreacion$.next(response.body);
      });
    return this.usuarioCreacion$.asObservable();
  }

  public buscarUsuarioPorNombre(nombre: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`http://localhost:8080/fitness/api/public/usuarios?nombre=${nombre}`);
  }

  public obtenerNumeroUsuarios(accessToken: string): Observable<number> {
    this.httpClient.get<number>('http://localhost:8080/fitness/api/viajes',
    {headers: this.generarCabecerasGetConAccessToken(accessToken), observe: 'response'}).subscribe(response => {
      this.numeroUsuarios$.next(response.body);
    });
    return this.numeroUsuarios$.asObservable();
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

  private generarCabecerasGetConAccessToken(accessToken: string): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization' : `Bearer ${accessToken}`
    });
  }

}
