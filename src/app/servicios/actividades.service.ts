import { Injectable } from '@angular/core';

// Peticiones
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo de datos
import { Actividad } from '../modelos/actividad.model';
import { Total } from '../modelos/total.model';

// Servicios
import { CabecerasHttpService } from './cabeceras-http.service';

// Producción
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

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
    console.log('Voy a llamar a obtener actividades con el id!!!', idUsuario);
    console.log('Con accesstoken: ', accessToken);
    return this.httpClient.get<Array<Actividad>>(environment.host + `/actividades?id=${idUsuario}`,
      {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(accessToken)});
  }

  public obtenerNumeroActividades(accessToken: string): Observable<Total> {
    return this.httpClient.get<Total>(environment.host + '/actividades/numero',
    {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(accessToken), observe: 'body'});
  }

}



