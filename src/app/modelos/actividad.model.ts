import { Coordenada } from './coordenada.model';

export class Actividad {

  nombre: string;
  categorias: Array<string>;
  descripciom: string;
  nivel: string;
  distancia: number;
  precio?: number;
  fechaInicio: Date;
  fechaFin: Date;
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
