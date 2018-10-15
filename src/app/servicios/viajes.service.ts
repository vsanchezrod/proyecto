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

  constructor(private httpClient: HttpClient) {}

  public obtenerListadoViajes$(): Observable<Array<Viaje>> {
    this.httpClient.get<Array<Viaje>>('http://localhost:8080/fitness/api/public/viajes',
      {headers: this.generarCabeceras(), observe: 'response'}).subscribe(response => {
        this.listaViajes$.next(response.body);
    });
    return this.listaViajes$.asObservable();
  }

  public guardarViaje(viaje: Viaje): Observable<HttpResponse<Viaje>> {
    const body = viaje;

    return this.httpClient.post<Viaje>('http://localhost:8080/fitness/api/public/viajes', body,
      {headers: this.generarCabeceras(), observe: 'response'});
  }

  private generarCabeceras(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

}
