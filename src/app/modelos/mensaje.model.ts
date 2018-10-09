export class Mensaje {

  id?: string;
  idUsuarioEmisor: string;
  idUsuarioReceptor: string;
  fecha: Date;
  asunto: string;
  mensaje: string;
  leido?: boolean;
}
