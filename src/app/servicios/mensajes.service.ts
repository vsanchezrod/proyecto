import { Injectable } from '@angular/core';

// Modelos
import { Mensaje } from '../modelos/mensaje.model';

// Realizar peticiones
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

// Observables
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private listaMensajes: Array<Mensaje> = [];
  private listaMensajes$: BehaviorSubject<Array<Mensaje>> = new BehaviorSubject<Array<Mensaje>>(this.listaMensajes);

  constructor(private httpClient: HttpClient) {}

  public obtenerListaDeMensajes$(id: string, accessToken: string): Observable<Array<Mensaje>> {
    this.httpClient.get<Array<Mensaje>>(environment.host + `/mensajes/${id}`,
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
