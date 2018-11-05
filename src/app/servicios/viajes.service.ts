import { Injectable } from '@angular/core';

// Modelos
import { Viaje } from '../modelos/viaje.model';
import { Total } from '../modelos/total.model';

// Realizar peticiones
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';

// Observables
import { Observable } from 'rxjs';

// Servicios
import { CabecerasHttpService } from './cabeceras-http.service';

// Producción
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  constructor(private httpClient: HttpClient,
              private cabecerasHttpService: CabecerasHttpService) {}

  // GENERALES
  public obtenerListaViajes$(): Observable<Array<Viaje>> {
    return this.httpClient.get<Array<Viaje>>(environment.host + '/public/viajes',
    {headers: this.cabecerasHttpService.generarCabecerasGet(), observe: 'body'});
  }

  public obtenerListadoViajesActuales$(): Observable<Array<Viaje>> {
    const params = new HttpParams().set('realizadas', 'false');
    return this.httpClient.get<Array<Viaje>>(environment.host + '/public/viajes',
      {headers: this.cabecerasHttpService.generarCabecerasGet(), params: params, observe: 'body'});
  }

  public obtenerListadoViajesRealizados$(): Observable<Array<Viaje>> {
    const params = new HttpParams().set('realizadas', 'true');
    return this.httpClient.get<Array<Viaje>>(environment.host + '/public/viajes',
      {headers: this.cabecerasHttpService.generarCabecerasGet(), params: params, observe: 'body'});
  }

  public crearViaje(viaje: Viaje): Observable<HttpResponse<Viaje>> {
    return this.httpClient.post<Viaje>(environment.host + '/public/viajes', viaje,
      {headers: this.cabecerasHttpService.generarCabecerasPost(), observe: 'response'});
  }

  public borrarViaje(id: string): Observable<HttpResponse<Viaje>> {
      return this.httpClient.delete<Viaje>(environment.host + `/viajes/${id}`,
        {headers: this.cabecerasHttpService.generarCabecerasPostConAccessToken(), observe: 'response'} );
  }

  public obtenerNumeroViajes(): Observable<Total> {
    return this.httpClient.get<Total>(environment.host + '/viajes/numero',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), observe: 'body'});
  }

  // POR USUARIO
  public obtenerListaViajesDelUsuario$(id: string): Observable<Array<Viaje>> {
    const params = new HttpParams().set('participante', id);
    return this.httpClient.get<Array<Viaje>>(environment.host + '/viajes',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), params: params, observe: 'body'});
  }

  public obtenerListadoProximosViajesDelUsuario$(id: string): Observable<Array<Viaje>> {
    const params = new HttpParams().set('realizadas', 'false').set('participante', id);
    return this.httpClient.get<Array<Viaje>>(environment.host + '/viajes',
      {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), params: params, observe: 'body'});
  }

  public obtenerListadoViajesRealizadosPorUsuario$(id: string): Observable<Array<Viaje>> {
    const params = new HttpParams().set('realizadas', 'true').set('participante', id);
    return this.httpClient.get<Array<Viaje>>(environment.host + '/viajes',
      {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), params: params, observe: 'body'});
  }

  public buscarViajesCreadosPorUsuario$(idUsuario: string): Observable<Array<Viaje>> {
    const params = new HttpParams().set('creador', idUsuario);
    return this.httpClient.get<Array<Viaje>>(environment.host + '/viajes',
      {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), params: params, observe: 'body'});
  }

}
