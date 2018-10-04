import { Interes } from './interes.model';
import { Provincia } from './provincia.model';

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
  intereses?: Array<Interes>;
  terminos: boolean;
  valoracion: number;
  roles?: Array<string>;

  constructor() {
    this.intereses = [];
    this.roles = [];
  }

}

