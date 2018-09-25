import { Coordenada } from './coordenada.model';

export class Actividad {

  nombre: string;
  categorias: Array<string>;
  descripciom: string;
  nivel: string;
  distancia: number;
  fechaInicio: Date;
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
