import { Injectable } from '@angular/core';

// Peticiones
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo de datos
import { Actividad } from '../modelos/actividad.model';
import { Total } from '../modelos/total.model';

// Servicios
import { CabecerasHttpService } from './cabeceras-http.service';
import { UsuarioSesionService } from './usuario-sesion.service';

// Producción
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private httpClient: HttpClient,
              private cabecerasHttpService: CabecerasHttpService) {}

  // ¿ELIMINAR?
  public obtenerListaActividades$(): Observable<Array<Actividad>> {
    return this.httpClient.get<Array<Actividad>>(environment.host + '/public/actividades',
    {headers: this.cabecerasHttpService.generarCabecerasGet(), observe: 'body'});
  }

  public obtenerListaActividadesActuales$(): Observable<Array<Actividad>> {
    const params = new HttpParams().set('realizadas', 'false');
    return this.httpClient.get<Array<Actividad>>(environment.host + '/public/actividades',
    {headers: this.cabecerasHttpService.generarCabecerasGet(), params: params, observe: 'body'});
  }

  public obtenerListaActividadesRealizadas$(): Observable<Array<Actividad>> {
    const params = new HttpParams().set('realizadas', 'true');
    return this.httpClient.get<Array<Actividad>>(environment.host + '/public/actividades',
    {headers: this.cabecerasHttpService.generarCabecerasGet(), params: params, observe: 'body'});
  }

  // Método para crear actividad y mandar la petición al API
  public crearActividad(actividad: Actividad): Observable<HttpResponse<Actividad>> {
    const body = actividad;
    return this.httpClient.post<Actividad>(environment.host + '/actividades', body,
     {headers: this.cabecerasHttpService.generarCabecerasPostConAccessToken(), observe: 'response'});
  }

  public borrarActividad(id: string): Observable<HttpResponse<Actividad>> {
    return this.httpClient.delete<Actividad>(environment.host + `/actividades/${id}`,
      {headers: this.cabecerasHttpService.generarCabecerasPostConAccessToken(), observe: 'response'} );
  }

  public buscarActividadesCreadasPorUsuario(idUsuario: string): Observable<Array<Actividad>> {
    console.log('Voy a llamar a obtener actividades con el id!!!', idUsuario);
    return this.httpClient.get<Array<Actividad>>(environment.host + `/actividades?id=${idUsuario}`,
      {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken()});
  }

  public obtenerNumeroActividades(): Observable<Total> {
    return this.httpClient.get<Total>(environment.host + '/actividades/numero',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), observe: 'body'});
  }

}



