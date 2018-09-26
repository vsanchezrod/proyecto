import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpinionesService {

  constructor(private httpClient: HttpClient) { }

  // Función para guardar una opinion
  public guardarOpinion(opinion: Opinion): Observable<any> {

    const body = JSON.stringify(opinion);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.httpClient.post('http://localhost:8080/fitness/api/public/opiniones', body, headers);
  }

}
