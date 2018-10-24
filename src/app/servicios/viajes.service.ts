import { Injectable } from '@angular/core';

// Modelos
import { Viaje } from '../modelos/viaje.model';

// Realizar peticiones
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

// Observables
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  private listaViajes: Array<Viaje> = [];
   // Se crea un canal de datos que se inicializa con un valor de array vacío
  private listaViajes$: BehaviorSubject<Array<Viaje>> = new BehaviorSubject<Array<Viaje>>(this.listaViajes);

  private numeroViaje = 0;
  private numeroViaje$: BehaviorSubject<number> = new BehaviorSubject<number>(this.numeroViaje);


  constructor(private httpClient: HttpClient) {}

  public obtenerListadoViajes$(): Observable<Array<Viaje>> {
    this.httpClient.get<Array<Viaje>>('http://localhost:8080/fitness/api/public/viajes',
      {headers: this.generarCabecerasGet(), observe: 'response'}).subscribe(response => {
        this.listaViajes$.next(response.body);
    });
    return this.listaViajes$.asObservable();
  }

  public guardarViaje(viaje: Viaje): Observable<HttpResponse<Viaje>> {
    return this.httpClient.post<Viaje>('http://localhost:8080/fitness/api/public/viajes', viaje,
      {headers: this.generarCabecerasPost(), observe: 'response'});
  }

  public obtenerNumeroViajes(accessToken: string): Observable<number> {
    this.httpClient.get<number>('http://localhost:8080/fitness/api/viajes',
    {headers: this.generarCabecerasGetConAccessToken(accessToken), observe: 'response'}).subscribe(response => {
      this.numeroViaje$.next(response.body);
    });
    return this.numeroViaje$.asObservable();
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
