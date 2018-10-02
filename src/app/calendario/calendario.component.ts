import { Component, OnInit } from '@angular/core';

// Servicio
import { ViajesService } from '../servicios/viajes.service';

// Modelos
import { Evento } from '../modelos/evento.model';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  public listaEventos: Array<Evento> = [];

  constructor(private viajesService: ViajesService) { }

  ngOnInit() {

    this.viajesService.obtenerViajes().subscribe(viajes => {
      console.log('Calendario VIAJES: ', viajes);
      for (const viaje of viajes) {
        const nuevoEvento: Evento = new Evento(viaje.nombre, '2018-10-22');
        this.listaEventos.push(nuevoEvento);

      }

    });

    this.viajesService.obtenerViajes2();

  }

}
