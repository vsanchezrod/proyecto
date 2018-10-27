import { Injectable } from '@angular/core';

// Peticiones
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// Modelo de datos
import { Actividad } from '../modelos/actividad.model';

// Servicios
import { CabecerasHttpService } from './cabeceras-http.service';

// Producción
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private numeroActividades = 0;
  private numeroActividades$: BehaviorSubject<number> = new BehaviorSubject<number>(this.numeroActividades);

  private actividadesCreadasPorUsuario: Array<Actividad> = [];
  private actividadesCreadasPorUsuario$: BehaviorSubject<Array<Actividad>> = new BehaviorSubject(this.actividadesCreadasPorUsuario);

  constructor(private httpClient: HttpClient,
              private cabecerasHttpService: CabecerasHttpService ) {}

  public obtenerListaActividades$(): Observable<Array<Actividad>> {
    return this.httpClient.get<Array<Actividad>>(environment.host + '/public/actividades',
    {headers: this.cabecerasHttpService.generarCabecerasGet(), observe: 'body'});

  }

  // Método para crear actividad y mandar la petición al API
  public crearActividad(actividad: Actividad, accessToken: string): Observable<HttpResponse<Actividad>> {
    const body = actividad;
    return this.httpClient.post<Actividad>(environment.host + '/actividades', body,
     {headers: this.cabecerasHttpService.generarCabecerasPostConAccessToken(accessToken), observe: 'response'});
  }

  public borrarActividad(id: string, accessToken: string): Observable<HttpResponse<Actividad>> {
    return this.httpClient.delete<Actividad>(environment.host + `/actividades/${id}`,
      {headers: this.cabecerasHttpService.generarCabecerasPostConAccessToken(accessToken), observe: 'response'} );
  }

  public buscarActividadesCreadasPorUsuario(idUsuario: string, accessToken: string): Observable<Array<Actividad>> {
    this.httpClient.get<Array<Actividad>>(environment.host + `/actividades?id=${idUsuario}`,
      {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(accessToken)}).subscribe ( response => {
        this.actividadesCreadasPorUsuario$.next(response);
        console.log('RESPONSE. BUSCAR ACTIVIDADES: ', response);
      });
    return this.actividadesCreadasPorUsuario$.asObservable();
  }

  public obtenerNumeroActividades(accessToken: string): Observable<number> {
    this.httpClient.get<number>(environment.host + '/actividades',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(accessToken), observe: 'response'}).subscribe(response => {
      this.numeroActividades$.next(response.body);
    });
    return this.numeroActividades$.asObservable();
  }

}



