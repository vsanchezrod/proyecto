import { Injectable } from '@angular/core';

// Modelos
import { Viaje } from '../modelos/viaje.model';
import { Total } from '../modelos/total.model';

// Realizar peticiones
import { HttpClient, HttpResponse } from '@angular/common/http';

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

  public obtenerListadoViajes$(): Observable<Array<Viaje>> {
    return this.httpClient.get<Array<Viaje>>(environment.host + '/public/viajes',
      {headers: this.cabecerasHttpService.generarCabecerasGet(), observe: 'body'});
  }

  public guardarViaje(viaje: Viaje): Observable<HttpResponse<Viaje>> {
    return this.httpClient.post<Viaje>(environment.host + '/public/viajes', viaje,
      {headers: this.cabecerasHttpService.generarCabecerasPost(), observe: 'response'});
  }

  public obtenerNumeroViajes(accessToken: string): Observable<Total> {
    return this.httpClient.get<Total>(environment.host + '/viajes/numero',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(accessToken), observe: 'body'});
  }

}
