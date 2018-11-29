import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';

// Modelo de datos
import { Usuario } from '../../modelos/usuario.model';
import { Evento } from '../../modelos/evento.model';
import { Viaje } from '../../modelos/viaje.model';
import { Actividad } from '../../modelos/actividad.model';

// Servicio
import { ViajesService } from '../../servicios/viajes.service';
import { ActividadesService } from '../../servicios/actividades.service';
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';

// Rutas
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendarioUsuario.component.html',
  styleUrls: ['./calendarioUsuario.component.css']
})
export class CalendarioUsuarioComponent implements OnInit, OnDestroy {

  public listaEventos: Array<Evento> = [];
  public listaProximosEventosViajes: Array<Evento> = [];
  public listaProximosEventosSalidas: Array<Evento> = [];

  // Configuración de la cabecera del calendario
  public cabeceraConfiguracion = {
    left:   'today',
    center: 'title',
    right:  'prev,next'
  };

  private usuario: Usuario;
  private subscripcionUsuarioLogado: Subscription;
  private subscripcionViajes: Subscription;
  private subscripcionSalidas: Subscription;

  constructor(private viajesService: ViajesService,
              private actividadesService: ActividadesService,
              private usuarioSesionService: UsuarioSesionService,
              private router: Router) { }

  ngOnInit() {

    this.subscripcionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;

        this.subscripcionViajes = this.viajesService.obtenerListaViajesDelUsuario$(this.usuario.id).subscribe(
          (viajes: Array<Viaje>) => {
            console.log('Usuario.id: ', this.usuario.id);
            // Se mapean los viajes con el modelo evento
            for (const viaje of viajes) {
              const fechaInicio: string = moment(viaje.fechaInicio).format('YYYY-MM-DD HH:mm');
              const fechaFin: string = moment(viaje.fechaFin).format('YYYY-MM-DD HH:mm');
              const nuevoEvento: Evento = new Evento(viaje.id, viaje.nombre, fechaInicio, fechaFin, 'viaje');
              this.listaEventos.push(nuevoEvento);
            }
        });

        this.subscripcionSalidas = this.actividadesService.obtenerListaActividadesDelUsuario$(this.usuario.id).subscribe(actividades => {

          // Se mapean las actividades con el modelo evento
          for (const actividad of actividades) {
            const fechaInicio: string = moment(actividad.fechaInicio).format('YYYY-MM-DD HH:mm');
            const fechaFin: string = moment(actividad.fechaInicio).format('YYYY-MM-DD HH:mm');
            const nuevoEvento: Evento = new Evento(actividad.id, actividad.nombre, fechaInicio, fechaFin, 'actividad');
            this.listaEventos.push(nuevoEvento);
          }

        });

        this.subscripcionSalidas = this.actividadesService.obtenerListadoProximasActividadesDelUsuario$(this.usuario.id).subscribe(actividades => {

         // Se mapean las actividades con el modelo evento
          for (const actividad of actividades) {
            const fechaInicio: string = moment(actividad.fechaInicio).format('YYYY-MM-DD HH:mm');
            const fechaFin: string = moment(actividad.fechaInicio).format('YYYY-MM-DD HH:mm');
            const nuevoEvento: Evento = new Evento(actividad.id, actividad.nombre, fechaInicio, fechaFin, 'actividad');
            this.listaProximosEventosSalidas.push(nuevoEvento);
          }

        });

        this.subscripcionViajes = this.viajesService.obtenerListadoProximosViajesDelUsuario$(this.usuario.id).subscribe(
          (viajes: Array<Viaje>) => {

            // Se mapean los viajes con el modelo evento
            for (const viaje of viajes) {
              const fechaInicio: string = moment(viaje.fechaInicio).format('YYYY-MM-DD HH:mm');
              const fechaFin: string = moment(viaje.fechaFin).format('YYYY-MM-DD HH:mm');
              const nuevoEvento: Evento = new Evento(viaje.id, viaje.nombre, fechaInicio, fechaFin, 'viaje');
              this.listaProximosEventosViajes.push(nuevoEvento);
            }
        });
      }
    );
 }

  ngOnDestroy() {
    this.subscripcionUsuarioLogado.unsubscribe();
    this.subscripcionViajes.unsubscribe();
    this.subscripcionSalidas.unsubscribe();
  }

  public visualizarEvento(event: any): void {

    console.log('EVENTO: ', event);
    const evento: Evento = {
      id: event.calEvent.id,
      tipo: event.calEvent.tipo
    };

    if (evento.tipo === 'actividad' ) {
      console.log(evento.tipo);
      this.verActividad(evento.id);

    }
    if (evento.tipo === 'viaje') {
      console.log(evento.tipo);
      this.verViaje(evento.id);
    }

  }

  public verActividad(idEvento: string): void {
    this.router.navigate(['/salida', idEvento]);
  }

  public verViaje(idEvento: string): void {
    this.router.navigate(['/viaje', idEvento]);
  }

}
