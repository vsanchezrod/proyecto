import { Coordenada } from './coordenada.model';

export class Salida {

  nombre: string;
  categorias: Array<any>;
  descripcion: string;
  nivel: number;
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
