import { Provincia } from './provincia.model';
import { ActividadCategoria } from './actividadCategoria.model';

export class Usuario {

  id?: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  fechaNacimiento: Date;
  sexo: string;
  provincia?: Provincia;
  avatar: string | ArrayBuffer;
  info: string;
  intereses?: Array<ActividadCategoria>;
  terminos: boolean;
  valoracion: number;
  valoracionTotal: number;
  numeroValoraciones: number;
  roles: Array<string>;
  amigos?: Array<string>;

  constructor(datos?: any) {
    this.intereses = [];
    this.roles = [];
    this.amigos = [];
    this.avatar = '/assets/imagenes/user.png';
    Object.assign(this, datos);
    if ( datos !== undefined && datos.fechaNacimiento !== undefined ) {
      this.fechaNacimiento = new Date(datos.fechaNacimiento);
    }
  }

}

