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
  avatar: string | ArrayBuffer;
  info: string;
  intereses?: Array<ActividadCategoria>;
  terminos: boolean;
  valoracion: number;
  roles: Array<string>; /////////////////////////////////////
  // roles?: Array<Rol>;
  amigos?: Array<string>;

  constructor() {
    this.intereses = [];
  //  this.roles = [];
    this.amigos = [];
  }
/*
  private esUsuario(): boolean {
    // TODO: implemtar
    return false;
  }

  private esAdministrador(): boolean {
    // TODO: implemtar
    return true;
  }
  */
}

