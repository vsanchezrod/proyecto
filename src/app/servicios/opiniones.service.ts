import { Injectable } from '@angular/core';

// Peticiones
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelos
import { Opinion } from '../modelos/opinion.model';
import { Total } from '../modelos/total.model';

// Servicios
import { CabecerasHttpService } from './cabeceras-http.service';

// Producción
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OpinionesService {

  constructor(private httpClient: HttpClient,
              private cabecerasHttpService: CabecerasHttpService) { }

  // Petición HTTP(POST) para guardar una opinión
  public guardarOpinion(opinion: Opinion): Observable<HttpResponse<Opinion>> {
    return this.httpClient.post<Opinion>(environment.host + '/opiniones', opinion,
      {headers: this.cabecerasHttpService.generarCabecerasPostPutPatchConAccessToken(), observe: 'response'});
  }

  // Petición HTTP(GET) para recuperar las opiniones
  public obtenerOpiniones(): Observable<Array<Opinion>> {
    return this.httpClient.get<Array<Opinion>>(environment.host + '/public/opiniones',
      {headers: this.cabecerasHttpService.generarCabecerasGet(), observe: 'body'});
  }

  public obtenerNumeroOpiniones(): Observable<Total> {
    return this.httpClient.get<Total>(environment.host + '/opiniones/numero',
      {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), observe: 'body'});
  }

  // Petición HTTP(DELETE) para borrar las opiniones
  public borrarOpinion(id: string): Observable<HttpResponse<any>> {
    return this.httpClient.delete<Opinion>(environment.host + `/opiniones/${id}`,
    {headers: this.cabecerasHttpService.generarCabecerasPostPutPatchConAccessToken(), observe: 'response'});
  }

}
