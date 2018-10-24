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

  private numeroActividades = 0;
  private numeroActividades$: BehaviorSubject<number> = new BehaviorSubject<number>(this.numeroActividades);

  constructor(private httpClient: HttpClient) {}

  public obtenerListaActividades$(): Observable<Array<Actividad>> {
    this.httpClient.get<Array<Actividad>>('http://localhost:8080/fitness/api/public/actividades',
    {headers: this.generarCabeceras(), observe: 'response'}).subscribe( response => {
      this.listaActividades$.next(response.body);
    });

    return this.listaActividades$.asObservable();
  }

  // Método para crear actividad y mandar la petición al API
  public crearActividad(actividad: Actividad, accessToken: string): Observable<HttpResponse<Actividad>> {
    const body = actividad;
    return this.httpClient.post<Actividad>('http://localhost:8080/fitness/api/actividades', body,
     {headers: this.generarCabecerasConAccessToken(accessToken), observe: 'response'});
  }

  public borrarActividad(id: string, accessToken: string): Observable<HttpResponse<Actividad>> {
    return this.httpClient.delete<Actividad>(`http://localhost:8080/fitness/api/actividades/${id}`,
      {headers: this.generarCabecerasConAccessToken(accessToken), observe: 'response'} );
  }

  public buscarActividadesCreadasPorUnUsuario(idUsuario: string, accessToken: string): Observable<Array<Actividad>> {
    return this.httpClient.get<Array<Actividad>>(`http://localhost:8080/fitness/api/actividades?id=${idUsuario}`,
      {headers: this.generarCabecerasConAccessToken(accessToken)});

  }

  public obtenerNumeroActividades(accessToken: string): Observable<number> {
    this.httpClient.get<number>('http://localhost:8080/fitness/api/actividades',
    {headers: this.generarCabecerasGetConAccessToken(accessToken), observe: 'response'}).subscribe(response => {
      this.numeroActividades$.next(response.body);
    });
    return this.numeroActividades$.asObservable();
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

  private generarCabecerasGetConAccessToken(accessToken: string): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization' : `Bearer ${accessToken}`
    });
  }
}



