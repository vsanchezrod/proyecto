import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo de datos
import { Actividad } from '../modelos/actividad.model';
import {Categoria} from '../modelos/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private httpClient: HttpClient) {}

  // Método para obtener las actividades de la bbdd
  public obtenerListaActividades(): Observable<HttpResponse<Array<Actividad>>> {
    return this.httpClient.get<Array<Actividad>>('http://localhost:8080/fitness/api/public/actividades', {observe: 'response'});
  }

  // Método para crear actividad y mandar la petición a backned
  public guardarActividad(actividad: Actividad): Observable<HttpResponse<Actividad>> {
    const body = actividad;

    // FALTAN LAS CABECERAS
    const cabeceras = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.httpClient.post<Actividad>('http://localhost:8080/fitness/api/public/actividades', body, {observe: 'response'});
  }

}



