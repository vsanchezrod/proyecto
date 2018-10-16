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

   

    return this.httpClient.post<Actividad>('http://localhost:8080/fitness/api/public/actividades', body, {observe: 'response'});
  }

  public borrarActividad(id: string): Observable<Usuario> {
    return this.httpClient.delete<Usuario>(`http://localhost:8080/fitness/api/public/actividades/${id}`);
  }

  private generarCabeceras(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

}



