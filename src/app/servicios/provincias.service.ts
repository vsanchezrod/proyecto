import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Provincia } from '../modelos/provincia.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  constructor(private httpClient: HttpClient) {}

  public obtenerProvincias(): Observable<HttpResponse<Array<Provincia>>> {

     return this.httpClient.get<Array<Provincia>>('http://localhost:8080/fitness/api/public/provincias', {observe: 'response'});
  }

}
