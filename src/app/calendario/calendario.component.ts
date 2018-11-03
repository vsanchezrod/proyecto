import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';

// Servicio
import { ViajesService } from '../servicios/viajes.service';
import { ActividadesService } from '../servicios/actividades.service';

// Rutas
import { Router } from '@angular/router';

// Modelos
import { Evento } from '../modelos/evento.model';

import { Subscription } from 'rxjs';

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

      // Se mapean los viajes con el modelo evento
      for (const viaje of viajes) {
        const fechaInicio: string = moment(viaje.fechaInicio).format('YYYY-MM-DD HH:mm');
        const fechaFin: string = moment(viaje.fechaFin).format('YYYY-MM-DD HH:mm');
        const nuevoEvento: Evento = new Evento(viaje.id, viaje.nombre, fechaInicio, fechaFin, 'viaje');
        this.listaEventos.push(nuevoEvento);
      }

    });

    this.subscripcionSalidas = this.actividadesService.obtenerListaActividades$().subscribe(actividades => {

      // Se mapean las actividades con el modelo event0
      for (const actividad of actividades) {
        const fechaInicio: string = moment(actividad.fechaInicio).format('YYYY-MM-DD HH:mm');
        const fechaFin: string = moment(actividad.fechaInicio).format('YYYY-MM-DD HH:mm');
        const nuevoEvento: Evento = new Evento(actividad.id, actividad.nombre, fechaInicio, fechaFin, 'actividad');
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
