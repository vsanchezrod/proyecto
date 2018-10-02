import { Usuario } from './usuario.model';

export interface Opinion {
  id?: string;
  actividad: any;
  titulo: string;
  detalle: string;
  fecha: Date;
  organizacionValoracion: number;
  ambienteValoracion: number;
  recorridoValoracion: number;
  usuario: Usuario;
}

