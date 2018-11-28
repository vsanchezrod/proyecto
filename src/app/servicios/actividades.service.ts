import { Injectable } from '@angular/core';

// Peticiones
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';

// Modelo de datos
import { Actividad } from '../modelos/actividad.model';
import { Total } from '../modelos/total.model';
import { NuevoParticipante } from '../modelos/nuevoParticipante.model';

// Servicios
import { CabecerasHttpService } from './cabeceras-http.service';

// Producción
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private cambioEnActividades$: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient,
              private cabecerasHttpService: CabecerasHttpService) {}

  // GENERALES

  public cambioEnActividades(): Observable<string> {
    return this.cambioEnActividades$.asObservable();
  }


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

  public crearActividad(actividad: Actividad): Observable<HttpResponse<any>> {
    const body = actividad;
    return this.httpClient.post<Actividad>(environment.host + '/actividades', body,
     {headers: this.cabecerasHttpService.generarCabecerasPostPutPatchConAccessToken(), observe: 'response'});
  }

  public borrarActividad(id: string, motivo: string): Observable<HttpResponse<any>> {
    let headers = this.cabecerasHttpService.generarCabecerasGetConAccessToken();
    headers = headers.append('X-Motivo', motivo);
    return this.httpClient.delete(environment.host + `/actividades/${id}`,
      {headers: headers, observe: 'response'}
      ).pipe(
          map(borrado => {
            this.cambioEnActividades$.next('Actualizar');
            return borrado;
          })
      );
  }

  public obtenerNumeroActividades(): Observable<Total> {
    return this.httpClient.get<Total>(environment.host + '/actividades/numero',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), observe: 'body'});
  }

  public obtenerListaActividadesPorCategoria$(idCategoria: string): Observable<Array<Actividad>> {
    const params = new HttpParams().set('categoria', idCategoria);
    return this.httpClient.get<Array<Actividad>>(environment.host + '/public/actividades',
    {headers: this.cabecerasHttpService.generarCabecerasGet(), params: params, observe: 'body'})
      .pipe(map(response => {
        const actividades = response.map(actividad => new Actividad(actividad));
        return actividades;
      })
    );
  }

  public obtenerActividadPorId$(idActividad: string): Observable<Actividad> {
    return this.httpClient.get<Actividad>(environment.host + `/public/actividades/${idActividad}`,
    {headers: this.cabecerasHttpService.generarCabecerasGet(), observe: 'body'})
      .pipe(map(actividad => {
        return new Actividad(actividad);
      }));
  }

  // POR USUARIO

  public apuntarseAActividad(idActividad: string, idUsuario: string): Observable<HttpResponse<Actividad>> {
    const nuevoParticipante: NuevoParticipante = {
      idParticipante: idUsuario
    };
    return this.httpClient.put<HttpResponse<Actividad>>(environment.host + `/actividades/${idActividad}/participantes`, nuevoParticipante,
    {headers: this.cabecerasHttpService.generarCabecerasPostPutPatchConAccessToken(), observe: 'body'});
  }

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

  public actualizarActividad(actividad: Actividad): Observable<HttpResponse<Actividad>> {
    return this.httpClient.patch<Actividad>(environment.host + `/actividades/${actividad.id}`, actividad,
    {headers: this.cabecerasHttpService.generarCabecerasPostPutPatchConAccessToken(), observe: 'response'}
    ).pipe(
      map(borrado => {
        this.cambioEnActividades$.next('Actualizar');
        return borrado;
      })
    );
  }
}
