import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Salida } from '../modelos/salida.model';


@Injectable({
  providedIn: 'root'
})
export class SalidasService {

  constructor(private httpClient: HttpClient) {}

  // Método público para poder acceder a los datos. Devuelve un array de Salidas
  public obtenerSalidas(): Observable<HttpResponse<Array<Salida>>> {
    return this.httpClient.get<Array<Salida>>('http://localhost:8080/fitness/api/public/salidas', {observe: 'response'});
  }

  // HACERLO CON BEHAVIOUR SUBJECT
  /*obtenerSalida(indice: number): Salida {
    return this.listaSalidas[indice];
  }*/


}
