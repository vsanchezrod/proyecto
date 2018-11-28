import { Injectable } from '@angular/core';

// Modelos
import { Viaje } from '../modelos/viaje.model';
import { Total } from '../modelos/total.model';
import { NuevoParticipante } from '../modelos/nuevoParticipante.model';

// Realizar peticiones
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';

// Observables
import { Observable, Subject } from 'rxjs';

// Servicios
import { CabecerasHttpService } from './cabeceras-http.service';

// Producción
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  private cambioEnViajes$: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient,
              private cabecerasHttpService: CabecerasHttpService) {}

  // GENERALES

  public cambioEnViajes(): Observable<string> {
    return this.cambioEnViajes$.asObservable();
  }

  public obtenerListaViajes$(): Observable<Array<Viaje>> {
    return this.httpClient.get<Array<Viaje>>(environment.host + '/public/viajes',
    {headers: this.cabecerasHttpService.generarCabecerasGet(), observe: 'body'})
      .pipe(map(response => {
        const viajes = response.map(viaje => new Viaje(viaje));
        return viajes;
      })
    );
  }

  public obtenerListadoViajesActuales$(): Observable<Array<Viaje>> {
    const params = new HttpParams().set('realizadas', 'false');
    return this.httpClient.get<Array<Viaje>>(environment.host + '/public/viajes',
    {headers: this.cabecerasHttpService.generarCabecerasGet(), params: params, observe: 'body'})
      .pipe(map(response => {
        const viajes = response.map(viaje => new Viaje(viaje));
        return viajes;
      })
    );
  }

  public obtenerListadoViajesRealizados$(): Observable<Array<Viaje>> {
    const params = new HttpParams().set('realizadas', 'true');
    return this.httpClient.get<Array<Viaje>>(environment.host + '/public/viajes',
    {headers: this.cabecerasHttpService.generarCabecerasGet(), params: params, observe: 'body'})
      .pipe(map(response => {
        const viajes = response.map(viaje => new Viaje(viaje));
        return viajes;
      })
    );
  }

  public crearViaje(viaje: Viaje): Observable<HttpResponse<Viaje>> {
    return this.httpClient.post<Viaje>(environment.host + '/viajes', viaje,
      {headers: this.cabecerasHttpService.generarCabecerasPostPutPatchConAccessToken(), observe: 'response'});
  }

  public borrarViaje(idViaje: string, motivo: string): Observable<HttpResponse<Viaje>> {
    let headers = this.cabecerasHttpService.generarCabecerasGetConAccessToken();
    headers = headers.append('X-Motivo', motivo);
    return this.httpClient.delete<Viaje>(environment.host + `/viajes/${idViaje}`,
      {headers: headers, observe: 'response'}
      ).pipe(
        map(borrado => {
          this.cambioEnViajes$.next('Actualizar');
          return borrado;
        })
    );
  }

  public obtenerNumeroViajes(): Observable<Total> {
    return this.httpClient.get<Total>(environment.host + '/viajes/numero',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), observe: 'body'});
  }

  public obtenerListaViajesPorCategoria$(idCategoria: string): Observable<Array<Viaje>> {
    const params = new HttpParams().set('categoria', idCategoria);
    return this.httpClient.get<Array<Viaje>>(environment.host + '/public/viajes',
    {headers: this.cabecerasHttpService.generarCabecerasGet(), params: params, observe: 'body'})
      .pipe(map(response => {
        const viajes = response.map(viaje => new Viaje(viaje));
        return viajes;
      })
    );
  }

  public obtenerViajePorId$(idViaje: string): Observable<Viaje> {
    return this.httpClient.get<Viaje>(environment.host + `/public/viajes/${idViaje}`,
    {headers: this.cabecerasHttpService.generarCabecerasGet(), observe: 'body'})
      .pipe(map(viaje => {
        return new Viaje(viaje);
      }));
  }

  // POR USUARIO

  public apuntarseAViaje(idViaje: string, idUsuario: string): Observable<HttpResponse<Viaje>> {
    const nuevoParticipante: NuevoParticipante = {
      idParticipante: idUsuario
    };
    return this.httpClient.put<HttpResponse<Viaje>>(environment.host + `/viajes/${idViaje}/participantes`, nuevoParticipante,
    {headers: this.cabecerasHttpService.generarCabecerasPostPutPatchConAccessToken(), observe: 'body'});
  }

  public obtenerListaViajesDelUsuario$(id: string): Observable<Array<Viaje>> {
    const params = new HttpParams().set('participante', id);
    return this.httpClient.get<Array<Viaje>>(environment.host + '/viajes',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), params: params, observe: 'body'})
      .pipe(map(response => {
        const viajes = response.map(viaje => new Viaje(viaje));
        return viajes;
      })
    );
  }

  public obtenerListadoProximosViajesDelUsuario$(id: string): Observable<Array<Viaje>> {
    const params = new HttpParams().set('realizadas', 'false').set('participante', id);
    return this.httpClient.get<Array<Viaje>>(environment.host + '/viajes',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), params: params, observe: 'body'})
      .pipe(map(response => {
        const viajes = response.map(viaje => new Viaje(viaje));
        return viajes;
      })
    );
  }

  public obtenerListadoViajesRealizadosPorUsuario$(id: string): Observable<Array<Viaje>> {
    const params = new HttpParams().set('realizadas', 'true').set('participante', id);
    return this.httpClient.get<Array<Viaje>>(environment.host + '/viajes',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), params: params, observe: 'body'})
        .pipe(map(response => {
          const viajes = response.map(viaje => new Viaje(viaje));
          return viajes;
        })
    );
  }

  public buscarViajesCreadosPorUsuario$(idUsuario: string): Observable<Array<Viaje>> {
    const params = new HttpParams().set('creador', idUsuario);
    return this.httpClient.get<Array<Viaje>>(environment.host + '/viajes',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), params: params, observe: 'body'})
        .pipe(map(response => {
          const viajes = response.map(viaje => new Viaje(viaje));
          return viajes;
        })
    );
  }

  public actualizarViaje(viaje: Viaje): Observable<HttpResponse<Viaje>> {
    return this.httpClient.patch<Viaje>(environment.host + `/viajes/${viaje.id}`, viaje,
    {headers: this.cabecerasHttpService.generarCabecerasPostPutPatchConAccessToken(), observe: 'response'}
    ).pipe(
      map(borrado => {
        this.cambioEnViajes$.next('Actualizar');
        return borrado;
      })
  );
  }
}
