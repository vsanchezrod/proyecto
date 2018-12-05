import { Component, OnInit, OnDestroy } from '@angular/core';

// Componentes
import { Opinion } from '../../modelos/opinion.model';
import { Usuario } from '../../modelos/usuario.model';
import { Mensaje } from 'src/app/modelos/mensaje.model';

// Servicio
import { OpinionesService } from '../../servicios/opiniones.service';
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';
import { MensajesService } from '../../servicios/mensajes.service';

import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.css']
})

export class OpinionesComponent implements OnInit, OnDestroy {

  public listaOpiniones: Array<Opinion> = [];
  private subscripcionOpiniones: Subscription;
  private usuario: Usuario;
  private subscripcionUsuarioLogado: Subscription;

  constructor(private usuarioSesionService: UsuarioSesionService,
              private opinionesService: OpinionesService,
              private mensajesService: MensajesService) { }

  ngOnInit() {

    this.subscripcionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;
      }
    );

    this.subscripcionOpiniones = this.opinionesService.obtenerOpiniones().subscribe( (listaOpiniones: Array<Opinion>) => {
      this.listaOpiniones = listaOpiniones;
    });
  }

  ngOnDestroy() {
    this.subscripcionUsuarioLogado.unsubscribe();
    this.subscripcionOpiniones.unsubscribe();
  }

  public borrarOpinion(idOpinion: string, opinion: Opinion)  {
    this.opinionesService.borrarOpinion(idOpinion).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Borrar opinion response:', response.status);
        this.mandarMensajeInfoBorradoOpinion(opinion);
    });
  }

  private mandarMensajeInfoBorradoOpinion(opinion) {
    const mensaje: Mensaje = new Mensaje();

    mensaje.idUsuarioEmisor = this.usuario.id;
    mensaje.idUsuarioReceptor = opinion.usuarioOpinion;
    mensaje.fecha = new Date();
    mensaje.asunto = 'Opinión borrada';
    mensaje.cuerpoMensaje = `Su opinión sobre la actividad '${opinion.actividad.nombre}'
      ha sido eliminada por no cumplir con las reglas de conducta apropiadas!`;

    this.mensajesService.mandarMensaje(mensaje).subscribe(
      (response: HttpResponse<Mensaje>) => {
        console.log(response);
      }
    );
  }


}
