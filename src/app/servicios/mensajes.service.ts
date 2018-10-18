import { Injectable } from '@angular/core';

// Modelos
import { Mensaje } from '../modelos/mensaje.model';

// Realizar peticiones
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

// Observables
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private listaMensajes: Array<Mensaje> = [];
  private listaMensajes$: BehaviorSubject<Array<Mensaje>> = new BehaviorSubject<Array<Mensaje>>(this.listaMensajes);

  constructor(private httpClient: HttpClient) {}

  public obtenerListadMensajes$(id: string, accessToken: string): Observable<Array<Mensaje>> {
    this.httpClient.get<Array<Mensaje>>(`http://localhost:8080/fitness/api/mensajes/${id}`,
      {headers: this.generarCabecerasConAccessToken(accessToken), observe: 'response'}).subscribe(response => {
        this.listaMensajes$.next(response.body);
    });
    return this.listaMensajes$.asObservable();
  }

  private generarCabecerasConAccessToken(accessToken: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : `Bearer ${accessToken}`
    });
  }

}
