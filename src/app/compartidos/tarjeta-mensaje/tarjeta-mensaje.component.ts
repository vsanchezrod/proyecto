import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as moment from 'moment';

// Modelo de datos
import { Mensaje } from '../../modelos/mensaje.model';
import { Usuario } from '../../modelos/usuario.model';

// Servicio
import { UsuariosService } from '../../servicios/usuarios.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tarjeta-mensaje',
  templateUrl: './tarjeta-mensaje.component.html',
  styleUrls: ['./tarjeta-mensaje.component.css']
})
export class TarjetaMensajeComponent implements OnInit, OnDestroy {

  @Input() mensaje: Mensaje;
  public usuario: Usuario;
  public idUsuario: string;
  public fechaParseada: string;

  private subscripcionBuscarUsuarioPorId: Subscription;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {

    this.fechaParseada = moment(this.mensaje.fecha).locale('es').format('d/MM/YYYY HH:mm');
    this.usuario = new Usuario();
    this.idUsuario = this.mensaje.idUsuarioEmisor;

    this.subscripcionBuscarUsuarioPorId = this.usuariosService.buscarUsuarioPorId(this.idUsuario).subscribe(
      (usuarioEmisorMensaje: Usuario) => {
        this.usuario = usuarioEmisorMensaje;
      }
    );

  }

  ngOnDestroy() {
    this.subscripcionBuscarUsuarioPorId.unsubscribe();
  }


}
