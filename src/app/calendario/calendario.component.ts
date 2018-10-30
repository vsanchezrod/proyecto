import { Component, OnInit, OnDestroy } from '@angular/core';

// Servicio
import { ViajesService } from '../servicios/viajes.service';
import { ActividadesService } from '../servicios/actividades.service';

// Rutas
import { Router } from '@angular/router';

// Modelos
import { Evento } from '../modelos/evento.model';

import { Subscription } from 'rxjs';

import * as moment from 'moment';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit, OnDestroy {

  public listaEventos: Array<Evento> = [];

  // Configuración de la cabecera del calendario
  public cabeceraConfiguracion = {
    left:   'today',
    center: 'title',
    right:  'prev,next'
  };

  private subscripcionViajes: Subscription;
  private subscripcionSalidas: Subscription;

  constructor(private viajesService: ViajesService,
              private actividadesService: ActividadesService,
              private router: Router) { }

  ngOnInit() {

    this.subscripcionViajes = this.viajesService.obtenerListadoViajes$().subscribe(viajes => {
      console.log('CALENDARIO: obtenerListadoViajes$: ', viajes);

      // Se crean eventos con los viajes
      for (const viaje of viajes) {
        // viaje.fechaInicio = moment(viaje.fechaInicio).format('YYYY-MM-DD');
        // viaje.fechaFin = ...........................
        const nuevoEvento: Evento = new Evento(viaje.id, viaje.nombre, '2018-10-22', '2018-10-26');
        this.listaEventos.push(nuevoEvento);
      }

    });

    this.subscripcionSalidas = this.actividadesService.obtenerListaActividades$().subscribe(actividades => {
      console.log('lista-actividades component. actividades: ', actividades);

      for (const actividad of actividades) {
        // salida.fechaInicio = moment(salida.fechaInicio).format('YYYY-MM-DD');
        const nuevoEvento: Evento = new Evento(actividad.id, actividad.nombre, '2018-10-23');
        this.listaEventos.push(nuevoEvento);
      }

    });

  }

  ngOnDestroy() {
    this.subscripcionViajes.unsubscribe();
    this.subscripcionSalidas.unsubscribe();
  }

  public visualizarEvento(evento): void {
    for (evento of this.listaEventos) {
      console.log(evento);
    }

    if (evento.end == null ) {
      this.router.navigate(['/salida', evento.id]);
    }
    else {
      this.router.navigate(['/viaje', evento.id]);
    }

  }


}
