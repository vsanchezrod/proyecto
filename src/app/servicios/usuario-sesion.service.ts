import { Injectable } from '@angular/core';

// Encode y decode base64
import { Base64 } from 'js-base64';

// Modelo
import { Usuario } from '../modelos/usuario.model';

// Peticiones HTTP
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject} from 'rxjs';

// Servicio
import { UsuariosService } from './usuarios.service';
import { CabecerasHttpService } from './cabeceras-http.service';

// Producción
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSesionService {

  private accessToken$ = new BehaviorSubject<string>('');
  private usuarioLogado$ = new BehaviorSubject<Usuario>(null);
  
  constructor(private httpClient: HttpClient,
              private usuariosService: UsuariosService,
              private cabecerasHttpService: CabecerasHttpService) { }
    
  public login(email: string, password: string): Observable<HttpResponse<any>> {
      
    const respuestaLogin$ = new Subject<HttpResponse<any>>();
    this.httpClient.post<any>(environment.host + '/oauth/token',
      this.generarBody(email, password),
      {headers: this.cabecerasHttpService.generarCabecerasLogin(), observe: 'response'})
        .subscribe(
          (response) => {
            const accessToken = this.obtenerAccessToken(response);
            this.accessToken$.next(accessToken);
            respuestaLogin$.next(response);
            this.obtenerUsuario(accessToken);
          },

          (errorResponse) => {
            console.error('UsuarioSesionService:login:responseError: ', errorResponse);
            // Si la respuesta es de error, se usa NEXT en vez de ERROR para que el suscribe ejecute la 2 funcion (algo ha ido mal)
            respuestaLogin$.error(errorResponse);
          },

          () => {
            console.log('UsuarioSesionService:login:ON COMPLETE XD');
          }

        );

    return respuestaLogin$.asObservable();

  }

  // TO DO - TERMINAR!!!
  public logout(): void {
    this.accessToken$.next(null);
    this.usuarioLogado$.next(null);
  }

  public obtenerAccessToken$(): Observable<string> {
    return this.accessToken$.asObservable();
  }

  public obtenerUsuario$(): Observable<Usuario> {
    return this.usuarioLogado$.asObservable();
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
