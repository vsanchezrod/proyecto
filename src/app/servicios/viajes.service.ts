import { Injectable } from '@angular/core';

import { Viaje } from '../modelos/viaje.model';

import {HttpClient, HttpResponse} from '@angular/common/http';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Opinion} from '../modelos/opinion.model';


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

}
