import { Injectable } from '@angular/core';

// Peticiones
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
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
  public guardarOpinion(opinion: Opinion): Observable<any> {
    return this.httpClient.post('http://localhost:8080/fitness/api/public/opiniones', opinion,
      {headers: this.generarCabecerasPost(), observe: 'response'});
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
    this.httpClient.get<number>('http://localhost:8080/fitness/api/actividades',
    {headers: this.generarCabecerasGetConAccessToken(accessToken), observe: 'response'}).subscribe(response => {
      this.numeroOpiniones$.next(response.body);
    });
    return this.numeroOpiniones$.asObservable();
  }

  // Petición HTTP(DELETE) para recuperar las opiniones
  public borrarOpinion(id: string): Observable<any> {
    console.log(id);
    return null;
    // return this.httpClient.delete('http://localhost:8080/fitness/api/public/opiniones', {observe: 'response'});

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
}
