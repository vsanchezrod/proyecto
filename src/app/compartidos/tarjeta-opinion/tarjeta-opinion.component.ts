import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as moment from 'moment';

// Modelos
import { Opinion } from '../../modelos/opinion.model';
import { Usuario } from '../../modelos/usuario.model';

// Servicio
import { UsuariosService } from '../../servicios/usuarios.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tarjeta-opinion',
  templateUrl: './tarjeta-opinion.component.html',
  styleUrls: ['./tarjeta-opinion.component.css']
})
export class TarjetaOpinionComponent implements OnInit, OnDestroy {

  // Se recibe el valor del elemento padre
  @Input() opinion: Opinion;
  public usuario: Usuario;
  public idUsuario: string;
  public fechaInicioParseada: string;
  private subscripcionBuscarUsuarioPorId: Subscription;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {

    this.usuario = new Usuario();
    this.idUsuario = this.opinion.usuarioOpinion;
    this.fechaInicioParseada = moment(this.opinion.fecha).locale('es').format('DD/MM/YYYY HH:mm');

    this.subscripcionBuscarUsuarioPorId = this.usuariosService.buscarUsuarioPorId(this.idUsuario).subscribe(
      (usuarioCreacion: Usuario) => {
        this.usuario = usuarioCreacion;
    });

  }

  ngOnDestroy() {
    this.subscripcionBuscarUsuarioPorId.unsubscribe();
  }

}
