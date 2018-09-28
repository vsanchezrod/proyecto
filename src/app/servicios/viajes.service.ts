import { Injectable } from '@angular/core';

import { Viaje } from '../modelos/viaje.model';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  // CAMBIAR PARA QUE LOS DATOS VENGAN DE LA API
  private listaViajes: Array<Viaje> = [
    {
      id: '1',
      nombre: 'Pirineos',
      categorias: ['lala1', 'lala2'],
      descripcion: 'lililililili',
      nivel: 3,
      distancia: 15,
      fechaInicio: new Date(),
      fechaFin: new Date(),
      precio: 100,
      plazas: 10,
      imagen: 'asdada',
      puntoEncuentro: {
        latitud: 0,
        longitud: 0
      }
    },
    {
      id: '2',
      nombre: 'Tourmalet',
      categorias: ['lala1', 'lala2'],
      descripcion: 'lililililili',
      nivel: 3,
      distancia: 100,
      fechaInicio: new Date(),
      fechaFin: new Date(),
      precio: 100,
      plazas: 15,
      imagen: 'asdada',
      puntoEncuentro: {
        latitud: 0,
        longitud: 0
      }
    },
    {
      id: '3',
      nombre: 'Hinojosa de San Vicente',
      categorias: ['lala1', 'lala2'],
      descripcion: 'lililililili',
      nivel: 2,
      distancia: 15,
      fechaInicio: new Date(),
      fechaFin: new Date(),
      precio: 100,
      plazas: 10,
      imagen: 'asdada',
      puntoEncuentro: {
        latitud: 0,
        longitud: 0
      }
    },
    {
      id: '4',
      nombre: 'Lalalalal1',
      categorias: ['lala1', 'lala2'],
      descripcion: 'lililililili',
      nivel: 2,
      distancia: 15,
      fechaInicio: new Date(),
      fechaFin: new Date(),
      precio: 1000,
      plazas: 5,
      imagen: 'asdada',
      puntoEncuentro: {
        latitud: 0,
        longitud: 0
      }
    }
  ];

  constructor() {}

  // Método para poder acceder a los datos. Devuelve un array de Salidas
  public obtenerViajes(): Array<Viaje> {
    return this.listaViajes;
  }

  // Método para poder acceder a una salida en concreto a través del índice
  public obtenerViaje(indice: number): Viaje {
    return this.listaViajes[indice];
  }

}
