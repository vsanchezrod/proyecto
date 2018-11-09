import { Injectable } from '@angular/core';

// Peticiones
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo de datos
import { Actividad } from '../modelos/actividad.model';
import { Total } from '../modelos/total.model';

// Servicios
import { CabecerasHttpService } from './cabeceras-http.service';

// Producción
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private httpClient: HttpClient,
              private cabecerasHttpService: CabecerasHttpService) {}

  // GENERALES
  public obtenerListaActividades$(): Observable<Array<Actividad>> {
    return this.httpClient.get<Array<Actividad>>(environment.host + '/public/actividades',
    {headers: this.cabecerasHttpService.generarCabecerasGet(), observe: 'body'})
      .pipe(map(response => {
        const actividades = response.map(actividad => new Actividad(actividad));
        return actividades;
      })
    );
  }

  public obtenerListaActividadesActuales$(): Observable<Array<Actividad>> {
    const params = new HttpParams().set('realizadas', 'false');
    return this.httpClient.get<Array<Actividad>>(environment.host + '/public/actividades',
    {headers: this.cabecerasHttpService.generarCabecerasGet(), params: params, observe: 'body'})
      .pipe(map(response => {
        const actividades = response.map(actividad => new Actividad(actividad));
        return actividades;
      })
    );
  }

  public obtenerListaActividadesRealizadas$(): Observable<Array<Actividad>> {
    const params = new HttpParams().set('realizadas', 'true');
    return this.httpClient.get<Array<Actividad>>(environment.host + '/public/actividades',
    {headers: this.cabecerasHttpService.generarCabecerasGet(), params: params, observe: 'body'})
      .pipe(map(response => {
        const actividades = response.map(actividad => new Actividad(actividad));
        return actividades;
      })
    );
  }

  public crearActividad(actividad: Actividad): Observable<HttpResponse<Actividad>> {
    const body = actividad;
    return this.httpClient.post<Actividad>(environment.host + '/actividades', body,
     {headers: this.cabecerasHttpService.generarCabecerasPostConAccessToken(), observe: 'response'});
  }

  public borrarActividad(id: string, motivo: string): Observable<HttpResponse<Actividad>> {
    let headers = this.cabecerasHttpService.generarCabecerasGetConAccessToken();
    headers = headers.append('X-Motivo', motivo);
    return this.httpClient.delete<Actividad>(environment.host + `/actividades/${id}`,
      {headers: headers, observe: 'response'} );
  }

  public obtenerNumeroActividades(): Observable<Total> {
    return this.httpClient.get<Total>(environment.host + '/actividades/numero',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), observe: 'body'});
  }

  // POR USUARIO

  public obtenerListaActividadesDelUsuario$(id: string): Observable<Array<Actividad>> {
    const params = new HttpParams().set('participante', id);
    return this.httpClient.get<Array<Actividad>>(environment.host + '/actividades',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), params: params, observe: 'body'})
      .pipe(map(response => {
        const actividades = response.map(actividad => new Actividad(actividad));
        return actividades;
      })
    );
  }

  public obtenerListadoProximasActividadesDelUsuario$(id: string): Observable<Array<Actividad>> {
    const params = new HttpParams().set('realizadas', 'false').set('participante', id);
    return this.httpClient.get<Array<Actividad>>(environment.host + '/actividades',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), params: params, observe: 'body'})
      .pipe(map(response => {
        const actividades = response.map(actividad => new Actividad(actividad));
        return actividades;
      })
    );
  }

  public obtenerListadoActividadesRealizadasPorUsuario$(id: string): Observable<Array<Actividad>> {
    const params = new HttpParams().set('realizadas', 'true').set('participante', id);
    return this.httpClient.get<Array<Actividad>>(environment.host + '/actividades',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), params: params, observe: 'body'})
      .pipe(map(response => {
        const actividades = response.map(actividad => new Actividad(actividad));
        return actividades;
      })
    );
  }

  public obtenerActividadesCreadasPorUsuario(idUsuario: string): Observable<Array<Actividad>> {
    const params = new HttpParams().set('creador', idUsuario);
    return this.httpClient.get<Array<Actividad>>(environment.host + '/actividades',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), params: params, observe: 'body'})
      .pipe(map(response => {
        const actividades = response.map(actividad => new Actividad(actividad));
        return actividades;
      })
    );
  }
}
