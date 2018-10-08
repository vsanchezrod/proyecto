import { Coordenada } from './coordenada.model';
import { Usuario } from './usuario.model';

export class Salida {

  id?: string
  nombre: string;
  categorias: Array<any>;
  descripcion: string;
  nivel: number;
  distancia: number;
  fechaInicio: Date;
  imagen?: string;
  puntoEncuentro?: Coordenada;
  puntuacion?: number;
  participantes?: number;
  usuarioCreacion?: Usuario;

  constructor() {
    this.categorias = [];
    this.puntoEncuentro = {
      latitud: 0,
      longitud: 0
    };

    this.puntuacion = 0;
    this.participantes = 1;
  }
}
