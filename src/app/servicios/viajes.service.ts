import { Injectable } from '@angular/core';

// Modelos
import { Viaje } from '../modelos/viaje.model';

// Realizar peticiones
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

// Observables
import { BehaviorSubject, Observable } from 'rxjs';

// Servicios
import { CabecerasHttpService } from './cabeceras-http.service';

// Producción
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  private listaViajes: Array<Viaje> = [];
   // Se crea un canal de datos que se inicializa con un valor de array vacío
  private listaViajes$: BehaviorSubject<Array<Viaje>> = new BehaviorSubject<Array<Viaje>>(this.listaViajes);

  private numeroViaje = 0;
  private numeroViaje$: BehaviorSubject<number> = new BehaviorSubject<number>(this.numeroViaje);


  constructor(private httpClient: HttpClient,
              private cabecerasHttpService: CabecerasHttpService) {}

  public obtenerListadoViajes$(): Observable<Array<Viaje>> {
    this.httpClient.get<Array<Viaje>>(environment.host + '/public/viajes',
      {headers: this.cabecerasHttpService.generarCabecerasGet(), observe: 'response'}).subscribe(response => {
        this.listaViajes$.next(response.body);
    });
    return this.listaViajes$.asObservable();
  }

  public guardarViaje(viaje: Viaje): Observable<HttpResponse<Viaje>> {
    return this.httpClient.post<Viaje>(environment.host + '/public/viajes', viaje,
      {headers: this.cabecerasHttpService.generarCabecerasPost(), observe: 'response'});
  }

  public obtenerNumeroViajes(accessToken: string): Observable<number> {
    this.httpClient.get<number>(environment.host + '/viajes',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(accessToken), observe: 'response'}).subscribe(response => {
      this.numeroViaje$.next(response.body);
    });
    return this.numeroViaje$.asObservable();
  }

}
