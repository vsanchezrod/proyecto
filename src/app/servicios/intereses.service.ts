import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo
import { Interes } from '../modelos/interes.model';

@Injectable({
  providedIn: 'root'
})
export class InteresesService {

  constructor(private httpClient: HttpClient) {}

  public obtenerListaIntereses(): Observable<HttpResponse<Array<Interes>>> {

    return this.httpClient.get<Array<Interes>>('http://localhost:8080/fitness/api/public/intereses', {observe: 'response'});

  }


}
