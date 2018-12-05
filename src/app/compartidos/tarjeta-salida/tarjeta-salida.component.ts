import {Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as moment from 'moment';

// Modelos
import { Actividad } from '../../modelos/actividad.model';
import { Usuario } from '../../modelos/usuario.model';

// Servicio
import { UsuariosService } from '../../servicios/usuarios.service';
import { ActividadesService } from '../../servicios/actividades.service';
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';

// Router para poder navegar por las diferentes rutas
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tarjeta-salida',
  templateUrl: './tarjeta-salida.component.html',
  styleUrls: ['./tarjeta-salida.component.css']
})
export class TarjetaSalidaComponent implements OnInit, OnDestroy {

  // Se recibe el valor de salida desde fuera (elemento padre)
  @Input() salida: Actividad = new Actividad();
  @Input() fechaInicioParseada?: string;
  public usuario: Usuario;
  public idUsuario: string;
  public mensaje: string;
  public usuarioLogado: Usuario;

  private subscripcionBuscarUsuarioPorId: Subscription;
  private subscripcionUsuarioLogado: Subscription;

  constructor(private router: Router,
              private usuariosService: UsuariosService,
              private actividadesService: ActividadesService,
              private usuarioSesionService: UsuarioSesionService) {}

  ngOnInit() {

    this.fechaInicioParseada = moment(this.salida.fechaInicio).locale('es').format('DD/MM/YYYY HH:mm');
    console.log('FEcha parseada: ', this.fechaInicioParseada);
    this.usuario = new Usuario();
    this.idUsuario = this.salida.idUsuarioCreacion;
    this.mensaje = `(Ya somos ${this.salida.listaParticipantes.length})`;

    this.subscripcionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe(
      (usuarioLogado: Usuario) => {
        this.usuarioLogado = usuarioLogado;
        if (this.idUsuario !== undefined) {
          this.subscripcionBuscarUsuarioPorId = this.usuariosService.buscarUsuarioPorId(this.idUsuario).subscribe(
            (usuarioCreacion: Usuario) => {
              this.usuario = usuarioCreacion;
            }
          );
        } else {
          this.subscripcionBuscarUsuarioPorId = this.usuariosService.buscarUsuarioPorId(this.usuarioLogado.id).subscribe(
            (usuarioCreacion: Usuario) => {
              this.usuario = usuarioCreacion;
            }
          );
        }
      }
    );


  }

  // Método para mostrar la salida
  public verSalida(): void {
    this.router.navigate(['/salida', this.salida.id]);
  }

  public mostrarBotonApuntarse(): boolean {

    if (new Date() < this.salida.fechaInicio && !this.usuarioYaApuntado()) {
      return true;
    }
    return false;
  }

  public usuarioYaApuntado() {
    if (this.usuarioLogado.id !== undefined) {
      return this.salida.listaParticipantes.includes(this.usuarioLogado.id);
    }
    return false;
  }

  public apuntarAActividad(idActividad: string): void {

    if (this.usuarioLogado.id !== undefined) {
      this.actividadesService.apuntarseAActividad(idActividad, this.usuarioLogado.id).subscribe(
        (response: HttpResponse<Actividad>) => {
          console.log('APUNTADO!!', response);
          this.actividadesService.obtenerActividadPorId$(idActividad).subscribe(
            (actividadActualizada: Actividad) => {
              this.salida = actividadActualizada;
            }
          );
        },
        (error: HttpErrorResponse) => {
          console.log('NO HE PODIDO APUNTARME!');
          console.error(error);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    this.subscripcionBuscarUsuarioPorId.unsubscribe();
    this.subscripcionUsuarioLogado.unsubscribe();
  }

}
