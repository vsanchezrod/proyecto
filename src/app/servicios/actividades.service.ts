import { Injectable } from '@angular/core';

// Peticiones
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// Modelo de datos
import { Actividad } from '../modelos/actividad.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private listaActividades: Array<Actividad> = [];

  private listaActividades$: BehaviorSubject<Array<Actividad>> = new BehaviorSubject(this.listaActividades);

  constructor(private httpClient: HttpClient) {}

  public obtenerListaActividades$(): Observable<Array<Actividad>> {
    this.httpClient.get<Array<Actividad>>('http://localhost:8080/fitness/api/public/actividades',
    {headers: this.generarCabeceras(), observe: 'response'}).subscribe( response => {
      this.listaActividades$.next(response.body);
    });

    return this.listaActividades$.asObservable();
  }

  // Método para crear actividad y mandar la petición a backned
  public crearActividad(actividad: Actividad, accessToken: string): Observable<HttpResponse<Actividad>> {
    const body = actividad;
    return this.httpClient.post<Actividad>('http://localhost:8080/fitness/api/actividades', body,
     {headers: this.generarCabecerasConAccessToken(accessToken), observe: 'response'});
  }

  public borrarActividad(id: string, accessToken: string): Observable<HttpResponse<Actividad>> {
    return this.httpClient.delete<Actividad>(`http://localhost:8080/fitness/api/actividades/${id}`,
      {headers: this.generarCabecerasConAccessToken(accessToken), observe: 'response'} );
  }

  private generarCabeceras(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  private generarCabecerasConAccessToken(accessToken: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : `Bearer ${accessToken}`
    });
  }

}



