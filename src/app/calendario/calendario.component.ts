import { Component, OnInit } from '@angular/core';

// Servicio
import { ViajesService } from '../servicios/viajes.service';
import { ActividadesService } from '../servicios/actividades.service';

// Rutas
import { Router } from '@angular/router';

// Modelos
import { Evento } from '../modelos/evento.model';

import * as moment from 'moment';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  public listaEventos: Array<Evento> = [];

  // Configuración de la cabecera del calendario
  cabeceraConfiguracion = {
    left:   'today',
    center: 'title',
    right:  'prev,next'
  };

  constructor(private viajesService: ViajesService,
              private actividadesService: ActividadesService,
              private router: Router) { }

  ngOnInit() {

    this.viajesService.obtenerViajes().subscribe(viajes => {

      for (const viaje of viajes) {
        // viaje.fechaInicio = moment(viaje.fechaInicio).format('YYYY-MM-DD');
        // viaje.fechaFin = ...........................
        const nuevoEvento: Evento = new Evento(viaje.id, viaje.nombre, '2018-10-22', '2018-10-26');
        this.listaEventos.push(nuevoEvento);
      }

    });

    this.viajesService.obtenerViajes2();

    this.actividadesService.obtenerListaActividades().subscribe( actividades => {

      for (const actividad of actividades.body) {
        // salida.fechaInicio = moment(salida.fechaInicio).format('YYYY-MM-DD');
        const nuevoEvento: Evento = new Evento(actividad.id, actividad.nombre, '2018-10-23');
        this.listaEventos.push(nuevoEvento);
      }

    });

  }

  visualizarEvento(evento) {
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
