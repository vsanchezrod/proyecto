import { OpinionActividad } from './opinionActividad.model';
import { OpinionUsuario } from './opinionUsuario.model';

export interface Opinion {
  id?: string;
  actividad: OpinionActividad;
  titulo: string;
  detalle: string;
  fecha: Date;
  organizacionValoracion: number;
  ambienteValoracion: number;
  recorridoValoracion: number;
  usuario: OpinionUsuario;
}

