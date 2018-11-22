import { Injectable } from '@angular/core';

// Modelos
import { Mensaje } from '../modelos/mensaje.model';

// Realizar peticiones
import { HttpClient, HttpResponse } from '@angular/common/http';

// Observables
import { BehaviorSubject, Observable } from 'rxjs';

// Servicios
import { CabecerasHttpService } from './cabeceras-http.service';

// Producción
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private listaMensajes: Array<Mensaje> = [];
  private listaMensajes$: BehaviorSubject<Array<Mensaje>> = new BehaviorSubject<Array<Mensaje>>(this.listaMensajes);

  constructor(private httpClient: HttpClient,
              private cabecerasHttpService: CabecerasHttpService) {}

  public obtenerListaDeMensajes$(id: string): Observable<Array<Mensaje>> {
    this.httpClient.get<Array<Mensaje>>(environment.host + `/mensajes/${id}`,
      {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), observe: 'response'}).subscribe(response => {
        this.listaMensajes$.next(response.body);
    });
    return this.listaMensajes$.asObservable();
  }

  public mandarMensaje(mensaje: Mensaje): Observable<HttpResponse<Mensaje>> {
    return this.httpClient.post<Mensaje>(environment.host + '/mensajes', mensaje,
      {headers: this.cabecerasHttpService.generarCabecerasPostPutPatchConAccessToken(), observe: 'response'});
  }

  public borrarMensaje (id: string): Observable<HttpResponse<Mensaje>> {
    console.log('BORRAR MENSAJE, ', id);
    return this.httpClient.delete<Mensaje>(environment.host + `/mensajes/${id}`,
      {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), observe: 'response'});
  }

  public actualizarMensaje(mensaje: Mensaje): Observable<HttpResponse<Mensaje>> {
    return this.httpClient.patch<Mensaje>(environment.host + `/mensajes/${mensaje.id}`, mensaje,
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), observe: 'response'});
  }

}
