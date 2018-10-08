import { Provincia } from './provincia.model';
import { ActividadCategoria } from './actividadCategoria.model';
import { Rol } from './rol.model';

export class Usuario {

  id?: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  fechaNacimiento: Date;
  sexo: string;
  provincia?: Provincia;
  avatar?: string;
  info?: string;
  intereses?: Array<ActividadCategoria>;
  terminos: boolean;
  valoracion: number;
  roles?: Array<Rol>;

  constructor() {
    this.intereses = [];
    this.roles = [];
  }

}

