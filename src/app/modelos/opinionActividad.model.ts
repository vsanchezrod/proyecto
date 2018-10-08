import { ActividadCategoria } from './actividadCategoria.model';

export interface OpinionActividad {
  id: string;
  nombre: string;
  categorias: ActividadCategoria;
}
