import { Injectable } from '@angular/core';

// Encode y decode base64
import { Base64 } from 'js-base64';

// Modelo
import { Usuario } from '../modelos/usuario.model';

// Peticiones HTTP
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

// Servicio
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSesionService {

  private respuestaLogin$ = new Subject<HttpResponse<any>>();
  private accessToken$ = new BehaviorSubject<string>('');
  private usuarioLogado$ = new Subject<Usuario>();

  constructor(private httpClient: HttpClient,
              private usuariosService: UsuariosService) { }

  public login(email: string, password: string): Observable<HttpResponse<any>> {

    this.httpClient.post<any>('http://localhost:8080/fitness/api/oauth/token',
      this.generarBody(email, password),
      {headers: this.generarCabeceras(), observe: 'response'})
        .subscribe(

          (response) => {
            const accessToken = this.obtenerAccessToken(response);

            this.obtenerUsuario(accessToken);

            this.accessToken$.next(accessToken);
            this.respuestaLogin$.next(response);
            },

          (errorResponse) => {
            console.error('UsuarioSesionService:login:responseError: ', errorResponse);
            // Si la respuesta es de error, se usa NEXT en vez de ERROR para que el suscribe ejecute la 2 funcion (algo ha ido mal)
            this.respuestaLogin$.next(errorResponse);
          }
        );

    return this.respuestaLogin$.asObservable();

  }

  public obtenerAccessToken$(): Observable<string> {
    return this.accessToken$.asObservable();
  }

  public obtenerUsuario$(): Observable<Usuario> {
    return this.usuarioLogado$.asObservable();
  }

  private generarCabeceras(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA=',
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

  private obtenerUsuario(accessToken: string): void {

    const arrayDatosToken = accessToken.split('.');

    // Se guarda en un string los datos del TOKEN (metadatos [0], datos[1], firma[2]
    const datosToken = arrayDatosToken[1];

    // Devuelve un STRING que contiene los datos del token decodeados. ID del usuario y authoritis
    const datosPayload = decodeURIComponent(atob(datosToken));

    // Se parsea el string a JSON y se accede a la propiedad
    const idUsuario = JSON.parse(datosPayload)['user_name'];

    this.usuariosService.buscarUsuarioPorId(idUsuario).subscribe((usuario: Usuario) => {
      this.usuarioLogado$.next(usuario);
    });
  }

}
