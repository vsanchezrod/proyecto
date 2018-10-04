import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo
import { Interes } from '../modelos/interes.model';
import {Opinion} from '../modelos/opinion.model';

@Injectable({
  providedIn: 'root'
})
export class InteresesService {

  constructor(private httpClient: HttpClient) {}

  public obtenerListaIntereses(): Observable<HttpResponse<Array<Interes>>> {

    return this.httpClient.get<Array<Interes>>('http://localhost:8080/fitness/api/public/intereses', {observe: 'response'});

  }

  // Petición HTTP(POST) para crear interés
  public crearInteres(interes: Interes): Observable<any> {

    const body = interes;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.httpClient.post('http://localhost:8080/fitness/api/public/intereses', body, {observe: 'response'});
  }


}
