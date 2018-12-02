import { Injectable } from '@angular/core';

// Modelo
import { Usuario } from '../modelos/usuario.model';

// Peticiones HTTP
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject} from 'rxjs';

// Producción
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSesionService {

  private accessToken$ = new BehaviorSubject<string>('');
  private usuarioLogado: Usuario = new Usuario();
  private usuarioLogado$ = new BehaviorSubject<Usuario>(new Usuario());

  constructor(private httpClient: HttpClient) { }

  public login(email: string, password: string): Observable<HttpResponse<any>> {

    const respuestaLogin$ = new Subject<HttpResponse<any>>();
    this.httpClient.post<any>(environment.host + '/oauth/token',
      this.generarBody(email, password),
      {headers: this.generarCabecerasLogin(), observe: 'response'})
        .subscribe(
          (response) => {
            const accessToken = this.obtenerAccessToken(response);
            this.accessToken$.next(accessToken);
            respuestaLogin$.next(response);
            this.obtenerUsuarioPorAccessToken(accessToken);
          },
          (errorResponse) => {
            console.error('UsuarioSesionService:login:responseError: ', errorResponse);
            // Error en el proceso de login
            respuestaLogin$.error(errorResponse);
          },
          () => {
            console.log('UsuarioSesionService:login:complete');
            respuestaLogin$.complete();
          }
        );
    return respuestaLogin$.asObservable();
  }

  public obtenerAccessToken$(): Observable<string> {
    return this.accessToken$.asObservable();
  }

  public obtenerUsuarioLogado$(): Observable<Usuario> {
    return this.usuarioLogado$.asObservable();
  }

  public modificarUsuarioLogado$(usuario: Usuario): void {
    this.usuarioLogado$.next(usuario);
  }

  public logout(): void {
    this.accessToken$.next(undefined);
    this.usuarioLogado$.next(new Usuario());
  }

  public esAdministrador(): boolean {
    return this.usuarioLogado.roles.includes('administrador');
  }

  public esUsuarioRegistrado(): boolean {
    return this.usuarioLogado.roles.includes('usuario');
  }

  private generarCabecerasLogin(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${environment.loginAuthorization}`,
      'Accept': 'application/json'
    });
  }

  private generarBody(email: string, password: string): HttpParams {
    return new HttpParams()
      .set('grant_type' , 'password')
      .set('username', email)
      .set('password', password);
  }

  private obtenerAccessToken(response: HttpResponse<any>): string {
    return response.body['access_token'];
  }

  private obtenerUsuarioPorAccessToken(accessToken: string): void {

    const arrayDatosToken = accessToken.split('.');

    // Se guarda en un string los datos del TOKEN (metadatos [0], datos[1], firma[2]
    const datosToken = arrayDatosToken[1];

    // Devuelve un STRING que contiene los datos del token decodeados. ID del usuario y authoritis
    const datosPayload = decodeURIComponent(atob(datosToken));

    // Se parsea el string a JSON y se accede a la propiedad
    const idUsuario = JSON.parse(datosPayload)['user_name'];

    this.buscarUsuarioPorId(idUsuario).subscribe((usuario: Usuario) => {
      this.usuarioLogado = usuario;
      this.usuarioLogado$.next(usuario);
    });
  }

  private buscarUsuarioPorId(id: string): Observable<Usuario> {
    const headers: HttpHeaders = new HttpHeaders ({
      'Accept': 'application/json'
    });

    return this.httpClient.get<Usuario>(environment.host + `/public/usuarios/${id}`,
      {headers: headers, observe: 'body'});
  }

}
