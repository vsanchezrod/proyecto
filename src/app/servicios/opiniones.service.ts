import { Injectable } from '@angular/core';

// Peticiones
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// Modelos
import { Opinion } from '../modelos/opinion.model';

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
  public guardarOpinion(opinion: Opinion, accessToken: string): Observable<HttpResponse<Opinion>> {
    return this.httpClient.post<Opinion>(environment.host + '/opiniones', opinion,
      {headers: this.cabecerasHttpService.generarCabecerasPostConAccessToken(accessToken), observe: 'response'});
  }

  // Petición HTTP(GET) para recuperar las opiniones
  public obtenerOpiniones(): Observable<Array<Opinion>> {
    return this.httpClient.get<Array<Opinion>>(environment.host + '/public/opiniones',
      {headers: this.cabecerasHttpService.generarCabecerasGet(), observe: 'body'});
  }

  public obtenerNumeroOpiniones(accessToken: string): Observable<number> {
    return this.httpClient.get<number>(environment.host + '/opiniones',
      {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(accessToken), observe: 'body'});
  }

  // Petición HTTP(DELETE) para borrar las opiniones
  public borrarOpinion(id: string, accessToken: string): Observable<HttpResponse<any>> {
    return this.httpClient.delete<Opinion>(environment.host + `/opiniones/${id}`,
    {headers: this.cabecerasHttpService.generarCabecerasPostConAccessToken(accessToken), observe: 'response'});
  }

}
