import { Coordenada } from './coordenada.model';

export class Viaje {

  nombre: string;
  categorias: Array<string>;
  descripcion: string;
  nivel: number;
  distancia: number;
  fechaInicio: Date;
  fechaFin: Date;
  precio: number;
  plazas: number;
  imagen: string;
  puntoEncuentro: Coordenada;

  constructor() {
    this.categorias = [];
    this.puntoEncuentro = {
      latitud: 0,
      longitud: 0
    };
  }

}
