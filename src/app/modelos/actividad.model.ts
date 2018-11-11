import {ActividadCategoria} from './actividadCategoria.model';
import {Coordenada} from './coordenada.model';

export class Actividad {

  id?: string;
  nombre: string;
  categorias: Array<ActividadCategoria>;
  descripcion: string;
  nivel: number;
  distancia?: number;
  fechaInicio: Date;
  imagen: string | ArrayBuffer;
  coordendas: Coordenada;
  idUsuarioCreacion: string;
  listaParticipantes: Array<string>;
  puntuacion: number;

  constructor(datos?: any) {
    this.categorias = [];
    this.listaParticipantes = [];
    this.coordendas = {
      latitud: 0,
      longitud: 0
    };
    this.imagen = '/assets/imagenes/fondo.jpg';
    Object.assign(this, datos);
    if ( datos !== undefined && datos.fechaInicio !== undefined ) {
      this.fechaInicio = new Date(datos.fechaInicio);
    }
  }

}
