import { Injectable } from '@angular/core';

import { Viaje } from '../modelos/viaje.model';

import {HttpClient, HttpResponse} from '@angular/common/http';

import {BehaviorSubject, Observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  private listaViajes: Array<Viaje> = [];
  private viajesSubject: BehaviorSubject<Array<Viaje>> = new BehaviorSubject<Array<Viaje>>(this.listaViajes);

  constructor(private httpClient: HttpClient) {}

  // Método para poder acceder a los datos. Devuelve un array de Salidas
  public obtenerViajes(): Observable<Array<Viaje>> {
    return this.viajesSubject.asObservable();
  }

  // Método para poder acceder a una salida en concreto a través del índice
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
    this.viajesSubject.next(this.listaViajes);
    return null;
  }

}
