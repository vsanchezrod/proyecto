import { Injectable } from '@angular/core';

import { Viaje } from '../modelos/viaje.model';

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import {BehaviorSubject, Observable, Subject} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  private listaViajes: Array<Viaje> = [];

  // Se crea un canal de datos que se inicializa con un valor de array vacío
  private _viajesSubject$: BehaviorSubject<Array<Viaje>> = new BehaviorSubject<Array<Viaje>>(this.listaViajes);

  constructor(private httpClient: HttpClient) {}

  public obtenerViajes(): Observable<Array<Viaje>> {
    return this._viajesSubject$.asObservable();
  }

  public obtenerViajes2() {
    this.httpClient.get<Array<Viaje>>('http://localhost:8080/fitness/api/public/viajes', {observe: 'response'}).subscribe(response => {
        this._viajesSubject$.next(response.body);
      }
    );
  }

  public guardarViaje(viaje: Viaje): Observable<HttpResponse<Viaje>> {

    const body = viaje;

    // FALTAN LAS CABECERAS
    const cabeceras = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }

    return this.httpClient.post<Viaje>('http://localhost:8080/fitness/api/public/viajes', body, {observe: 'response'});
  }

}
