import { Injectable } from '@angular/core';

// Peticiones
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// Modelos
import { Opinion } from '../modelos/opinion.model';

@Injectable({
  providedIn: 'root'
})
export class OpinionesService {

  private listaOpiniones: Array<Opinion> = [];
  private listaOpiniones$: BehaviorSubject<Array<Opinion>> = new BehaviorSubject<Array<Opinion>>(this.listaOpiniones);

  private numeroOpiniones = 0;
  private numeroOpiniones$: BehaviorSubject<number> = new BehaviorSubject<number>(this.numeroOpiniones);


  constructor(private httpClient: HttpClient) { }

  // Petición HTTP(POST) para guardar una opinión
  public guardarOpinion(opinion: Opinion, accessToken: string): Observable<HttpResponse<Opinion>> {
    return this.httpClient.post<Opinion>('http://localhost:8080/fitness/api/opiniones', opinion,
      {headers: this.generarCabecerasPostConAccessToken(accessToken), observe: 'response'});
  }

  // Petición HTTP(GET) para recuperar las opiniones
  public obtenerOpiniones(): Observable<Array<Opinion>> {
    this.httpClient.get<Array<Opinion>>('http://localhost:8080/fitness/api/public/opiniones',
    {headers: this.generarCabecerasGet(), observe: 'response'}).subscribe(response => {
      this.listaOpiniones$.next(response.body);
    });
    return this.listaOpiniones$.asObservable();
  }

  public obtenerNumeroOpiniones(accessToken: string): Observable<number> {
    this.httpClient.get<number>('http://localhost:8080/fitness/api/opiniones',
    {headers: this.generarCabecerasGetConAccessToken(accessToken), observe: 'response'}).subscribe(response => {
      this.numeroOpiniones$.next(response.body);
    });
    return this.numeroOpiniones$.asObservable();
  }

  // Petición HTTP(DELETE) para borrar las opiniones
  public borrarOpinion(id: string, accessToken: string): Observable<HttpResponse<any>> {
    return this.httpClient.delete<Opinion>(`http://localhost:8080/fitness/api/opiniones/${id}`,
    {headers: this.generarCabecerasPostConAccessToken(accessToken), observe: 'response'});
  }

  private generarCabecerasGet(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json'
    });
  }

  private generarCabecerasPost(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  private generarCabecerasGetConAccessToken(accessToken: string): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization' : `Bearer ${accessToken}`
    });
  }

  private generarCabecerasPostConAccessToken(accessToken: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : `Bearer ${accessToken}`
    });
  }

}
