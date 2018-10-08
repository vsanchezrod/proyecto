import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo de datos
import { Actividad } from '../modelos/actividad.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private httpClient: HttpClient) {}

  // Método para obtener las actividades de la bbdd
  public obtenerListaActividades(): Observable<HttpResponse<Array<Actividad>>> {
    return this.httpClient.get<Array<Actividad>>('http://localhost:8080/fitness/api/public/actividades', {observe: 'response'});
  }
}



