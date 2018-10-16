import { Injectable } from '@angular/core';

// Peticiones
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// Modelo de datos
import { Actividad } from '../modelos/actividad.model';
import {Categoria} from '../modelos/categoria.model';
import { Usuario } from '../modelos/usuario.model';

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
  public guardarActividad(actividad: Actividad): Observable<HttpResponse<Actividad>> {
    const body = actividad;
    return this.httpClient.post<Actividad>('http://localhost:8080/fitness/api/public/actividades', body,
     {headers: this.generarCabeceras(), observe: 'response'});
  }

  public borrarActividad(id: string): Observable<HttpResponse<Actividad>> {
    return this.httpClient.delete<Actividad>(`http://localhost:8080/fitness/api/actividades/${id}`,
      {headers: this.generarCabecerasConAccessToken(), observe: 'response'} );
  }

  private generarCabeceras(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  private generarCabecerasConAccessToken(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidGVzdGp3dHJlc291cmNlaWQiXSwidXNlcl9uYW1lIjoiNWJjMGJlN2FkZjU1MDcxOTY0MjcwNDQ2Iiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTUzOTcyMTIzMSwiYXV0aG9yaXRpZXMiOlsiYWRtaW5pc3RyYWRvciIsInVzdWFyaW8iXSwianRpIjoiODEwZDM2YzAtYTNkZS00MDg4LWI0ODYtNTNhZWZhYjdkMTk3IiwiY2xpZW50X2lkIjoidGVzdGp3dGNsaWVudGlkIn0.p0pk1TOXsy2sg3FkQCmvk43WaJds1EW73jI1xvywHEU'
    });
  }

}



