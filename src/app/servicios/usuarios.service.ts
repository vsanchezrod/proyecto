import { Injectable } from '@angular/core';

// Peticiones Http
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// Componente
import { Usuario } from '../modelos/usuario.model';
import { Total } from '../modelos/total.model';

// Producción
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

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

  public obtenerListaUsuarios$(): Observable<Array<Usuario>> {

    this.httpClient.get<Array<Usuario>>(environment.host + '/usuarios',
      {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), observe: 'response'}).subscribe( (response) => {
      this.listaUsuarios$.next(response.body);
      console.log('ServicioUsuario: ListaUsuarios: ', response.body);
    });
    return this.listaUsuarios$.asObservable();
  }

  public crearUsuario(usuario: Usuario): Observable<HttpResponse<Usuario>> {
    return this.httpClient.post<Usuario>(environment.host + '/public/usuarios', usuario,
      {headers: this.cabecerasHttpService.generarCabecerasPost(), observe: 'response'});
  }

  public buscarUsuarioPorId(idUsuario: string): Observable<Usuario> {
    console.log('buscarUsuarioPorId: ', idUsuario);
    return this.httpClient.get<Usuario>(environment.host + `/public/usuarios/${idUsuario}`,
      {headers: this.cabecerasHttpService.generarCabecerasGet(), observe: 'body'})
      .pipe(map(usuario => {
        return new Usuario(usuario);
      }));
  }

  public buscarUsuarioPorNombre(nombre: string): Observable<Usuario> {
    const params = new HttpParams().set('nombre', nombre);
    return this.httpClient.get<Usuario>(environment.host + '/public/usuarios',
      {headers: this.cabecerasHttpService.generarCabecerasGet(), params: params, observe: 'body'});
  }

  public obtenerNumeroUsuarios(): Observable<Total> {
    return this.httpClient.get<Total>(environment.host + '/usuarios/numero',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), observe: 'body'});
  }

  public actualizarUsuario(usuario: Usuario): Observable<HttpResponse<Usuario>> {
    return this.httpClient.patch<Usuario>(environment.host + `/usuarios/${usuario.id}`, usuario,
    {headers: this.cabecerasHttpService.generarCabecerasPostPutPatchConAccessToken(), observe: 'response'});
  }

  public borrarUsuario (id: string): Observable<HttpResponse<Usuario>> {
    return this.httpClient.delete<Usuario>(environment.host + `/usuarios/${id}`,
      {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), observe: 'response'});
  }

  public obtenerNumeroMensajesNoLeidosDeUsuario(id: String): Observable<Total> {
    const params = new HttpParams().set('estado', 'false');
    return this.httpClient.get<Total>(environment.host + `/usuarios/${id}/mensajes/numero`,
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), params: params, observe: 'body'});
  }

}
