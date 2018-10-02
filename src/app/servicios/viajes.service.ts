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

  public obtenerViaje(id: string): Viaje {
    const viajeNuevo: Viaje = {
      id: id,
      categorias: undefined,
      descripcion: 'desc',
      distancia: 1,
      fechaFin: new Date(),
      fechaInicio: new Date(),
      imagen: 'img',
      nivel: 1,
      nombre: 'nombre' + id,
      plazas: 1,
      precio: 1,
      puntoEncuentro: undefined
    };

    console.log('ViajesService.obtenerViaje: ', viajeNuevo);
    this.listaViajes.push(viajeNuevo);

    // Con el método next se mandan los datos por el canal abierto
    this._viajesSubject$.next(this.listaViajes);
    return null;
  }

}
