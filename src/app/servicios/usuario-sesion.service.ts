import { Injectable } from '@angular/core';

// Encode y decode base64
import { Base64 } from 'js-base64';

// Modelo
import { Usuario } from '../modelos/usuario.model';

// Peticiones HTTP
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSesionService {

  public usuario$: Observable<Usuario>;

  private respuestaLogin$ = new Subject<HttpResponse<any>>();
  private _accessToken$ = new BehaviorSubject<string>('');
  private _usuarioAcceso$ = new Subject<Usuario>();
  public accessToken$ = this._accessToken$.asObservable();

  private tokenArray: Array<string>;
  private datosToken: string;
  private idUsuarioLogado: string;

  constructor(private httpClient: HttpClient) { }

  public login(email: string, password: string): Observable<HttpResponse<any>> {

    this.httpClient.post<any>('http://localhost:8080/fitness/api/oauth/token',
      this.generarBody(email, password),
      {headers: this.generarCabeceras(), observe: 'response'})
        .subscribe(

          (response) => {
            const accessToken = this.obtenerAccessToken(response);
            this._accessToken$.next(accessToken);
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

  private generarCabeceras(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic  dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA=',
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


  private tmp(): void {
    // Del objeto guardamos la parte del string del token
    // this.accessToken$ = this.accessTokenCompleto.access_token;

    // Un token se divide en 3 partes separadas por . (Metadatos del token, datos del token, firma)
    // this.tokenArray = this.accessToken$.split('.');

    // Se guarda en un string los datos del TOKEN
    this.datosToken = this.tokenArray[1];

    // Devuelve el objeto que contiene los datos del token decodeados. ID del usuario y authoritis
    this.idUsuarioLogado = decodeURIComponent(atob(this.datosToken));
  }

}
