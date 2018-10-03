import { Injectable } from '@angular/core';

import { Salida } from '../modelos/salida.model';


@Injectable({
  providedIn: 'root'
})
export class SalidasService {

  // CAMBIAR PARA QUE LOS DATOS VENGAN DE LA API
  public listaSalidas: Array<Salida> = [
    {
      nombre: 'Hinojosa de San Vicente',
      categorias: ['lala1', 'lala2'],
      descripcion: 'lililililili',
      nivel: 1,
      distancia: 15,
      fechaInicio: new Date(),
      imagen: 'asdada',
      puntoEncuentro: {
        latitud: 0,
        longitud: 0
      }
    },
    {
      nombre: 'LALALALLA2',
      categorias: ['lala1', 'lala2'],
      descripcion: 'lililililili',
      nivel: 3,
      distancia: 15,
      fechaInicio: new Date(),
      imagen: 'asdada',
      puntoEncuentro: {
        latitud: 0,
        longitud: 0
      }
    },
    {
      nombre: 'LALALAL 3',
      categorias: ['lala1', 'lala2'],
      descripcion: 'lililililili',
      nivel: 2,
      distancia: 50,
      fechaInicio: new Date(),
      imagen: 'asdada',
      puntoEncuentro: {
        latitud: 0,
        longitud: 0
      }
    }
  ];

  constructor() {}

  // Método público para poder acceder a los datos. Devuelve un array de Salidas
  obtenerSalidas(): Array<Salida> {
    return this.listaSalidas;
  }

  // Método público para poder acceder a una salida en concreto a través del índice
  obtenerSalida(indice: number): Salida {
    return this.listaSalidas[indice];
  }


}
