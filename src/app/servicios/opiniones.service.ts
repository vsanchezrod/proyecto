import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Opinion } from '../modelos/opinion.model';

@Injectable({
  providedIn: 'root'
})
export class OpinionesService {

  constructor(private httpClient: HttpClient) { }

  // Petición HTTP(POST) para guardar una opinión
  public guardarOpinion(opinion: Opinion): Observable<any> {

    const body = opinion;

    return this.httpClient.post('http://localhost:8080/fitness/api/public/opiniones', body,
      {headers: this.generarCabeceras(), observe: 'response'});
  }

  // Petición HTTP(GET) para recuperar las opiniones
  public obtenerOpiniones(): Observable<HttpResponse<Array<Opinion>>> {

    return this.httpClient.get<Array<Opinion>>('http://localhost:8080/fitness/api/public/opiniones', {observe: 'response'});
  }

  // Petición HTTP(DELETE) para recuperar las opiniones
  public borrarOpinion(id: string): Observable<any> {
    console.log(id);
    return null;
    // return this.httpClient.delete('http://localhost:8080/fitness/api/public/opiniones', {observe: 'response'});

  }

  private generarCabeceras(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }
}
