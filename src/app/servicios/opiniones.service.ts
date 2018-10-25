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

  private listaOpiniones: Array<Opinion> = [];
  private listaOpiniones$: BehaviorSubject<Array<Opinion>> = new BehaviorSubject<Array<Opinion>>(this.listaOpiniones);

  private numeroOpiniones = 0;
  private numeroOpiniones$: BehaviorSubject<number> = new BehaviorSubject<number>(this.numeroOpiniones);


  constructor(private httpClient: HttpClient,
              private cabecerasHttpService: CabecerasHttpService) { }

  // Petición HTTP(POST) para guardar una opinión
  public guardarOpinion(opinion: Opinion, accessToken: string): Observable<HttpResponse<Opinion>> {
    return this.httpClient.post<Opinion>(environment.host + '/opiniones', opinion,
      {headers: this.cabecerasHttpService.generarCabecerasPostConAccessToken(accessToken), observe: 'response'});
  }

  // Petición HTTP(GET) para recuperar las opiniones
  public obtenerOpiniones(): Observable<Array<Opinion>> {
    this.httpClient.get<Array<Opinion>>(environment.host + '/public/opiniones',
    {headers: this.cabecerasHttpService.generarCabecerasGet(), observe: 'response'}).subscribe(response => {
      this.listaOpiniones$.next(response.body);
    });
    return this.listaOpiniones$.asObservable();
  }

  public obtenerNumeroOpiniones(accessToken: string): Observable<number> {
    this.httpClient.get<number>(environment.host + '/opiniones',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(accessToken), observe: 'response'}).subscribe(response => {
      this.numeroOpiniones$.next(response.body);
    });
    return this.numeroOpiniones$.asObservable();
  }

  // Petición HTTP(DELETE) para borrar las opiniones
  public borrarOpinion(id: string, accessToken: string): Observable<HttpResponse<any>> {
    return this.httpClient.delete<Opinion>(environment.host + `/opiniones/${id}`,
    {headers: this.cabecerasHttpService.generarCabecerasPostConAccessToken(accessToken), observe: 'response'});
  }

}
