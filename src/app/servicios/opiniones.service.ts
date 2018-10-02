import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Opinion } from '../modelos/opinion.model';

@Injectable({
  providedIn: 'root'
})
export class OpinionesService {

  constructor(private httpClient: HttpClient) { }

  // Función para guardar una opinion
  public guardarOpinion(opinion: Opinion): Observable<any> {

    const body = opinion;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.httpClient.post('http://localhost:8080/fitness/api/public/opiniones', body, {observe: 'response'},);
  }

  public obtenerOpiniones(): Observable<HttpResponse<Array<Opinion>>> {

    return this.httpClient.get<Array<Opinion>>('http://localhost:8080/fitness/api/public/opiniones', {observe: 'response'});
  }


}
