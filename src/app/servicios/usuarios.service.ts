import { Injectable } from '@angular/core';

// Peticiones Http
import {HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// Componente
import { Usuario } from '../modelos/usuario.model';
import { Total } from '../modelos/total.model';

// Producción
import { environment } from '../../environments/environment';

// Servicios
import { CabecerasHttpService } from './cabeceras-http.service';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private listaUsuarios: Array<Usuario> = [];
  private listaUsuarios$: BehaviorSubject<Array<Usuario>> = new BehaviorSubject<Array<Usuario>>(this.listaUsuarios);

  constructor(private httpClient: HttpClient,
              private cabecerasHttpService: CabecerasHttpService) { }

  public obtenerListaUsuarios$(accessToken: string): Observable<Array<Usuario>> {

    this.httpClient.get<Array<Usuario>>(environment.host + '/usuarios',
      {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(accessToken), observe: 'response'}).subscribe( (response) => {
      this.listaUsuarios$.next(response.body);
      console.log('ServicioUsuario: ListaUsuarios: ', response.body);
    });
    return this.listaUsuarios$.asObservable();
  }

  public crearUsuario(usuario: Usuario): Observable<HttpResponse<Usuario>> {
    return this.httpClient.post<Usuario>(environment.host + '/public/usuarios', usuario,
      {headers: this.cabecerasHttpService.generarCabecerasPost(), observe: 'response'});
  }

  public buscarUsuarioPorId(id: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(environment.host + `/public/usuarios/${id}`,
      {headers: this.cabecerasHttpService.generarCabecerasGet(), observe: 'body'});
  }

  // REVISAR ESTE MÉTODO Y EL TIPO DE OBSERVABLE
  public buscarUsuarioPorNombre(nombre: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(environment.host + `/public/usuarios?nombre=${nombre}`,
      {headers: this.cabecerasHttpService.generarCabecerasGet()});
  }

  public obtenerNumeroUsuarios(accessToken: string): Observable<Total> {
    return this.httpClient.get<Total>(environment.host + '/usuarios/numero',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(accessToken), observe: 'body'});
  }

}
