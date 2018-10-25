import { OpinionActividad } from './opinionActividad.model';

export interface Opinion {
  id?: string;
  actividad: OpinionActividad;
  titulo: string;
  detalle: string;
  fecha: Date;
  organizacionValoracion: number;
  ambienteValoracion: number;
  recorridoValoracion: number;
  usuarioOpinion: string;
}

