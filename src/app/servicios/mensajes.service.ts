import { Injectable } from '@angular/core';

// Modelos
import { Mensaje } from '../modelos/mensaje.model';

// Realizar peticiones
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Observables
import { BehaviorSubject, Observable } from 'rxjs';

// Servicios
import { CabecerasHttpService } from './cabeceras-http.service';

// Producción
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private listaMensajes: Array<Mensaje> = [];
  private listaMensajes$: BehaviorSubject<Array<Mensaje>> = new BehaviorSubject<Array<Mensaje>>(this.listaMensajes);

  constructor(private httpClient: HttpClient,
              private cabecerasHttpService: CabecerasHttpService) {}

  public obtenerListaDeMensajes$(id: string, accessToken: string): Observable<Array<Mensaje>> {
    this.httpClient.get<Array<Mensaje>>(environment.host + `/mensajes/${id}`,
      {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(accessToken), observe: 'response'}).subscribe(response => {
        this.listaMensajes$.next(response.body);
    });
    return this.listaMensajes$.asObservable();
  }

}
