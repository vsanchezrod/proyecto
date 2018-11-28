import { Component, OnInit } from '@angular/core';

// Modelos de datos
import { Viaje } from '../../../modelos/viaje.model';
import { Actividad } from '../../../modelos/actividad.model';

// Servicio
import { ViajesService } from '../../../servicios/viajes.service';
import { ActividadesService } from '../../../servicios/actividades.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-actividades-administrador-lista',
  templateUrl: './actividades-administrador-lista.component.html',
  styleUrls: ['./actividades-administrador-lista.component.css']
})
export class ActividadesAdministradorListaComponent implements OnInit {

  public listaViajes: Array<Viaje> = [];
  public listaActividades: Array<Actividad> = [];

  constructor(private viajesService: ViajesService,
              private actividadesService: ActividadesService,
              private router: Router) { }

  ngOnInit() {

    this.obtenerListadoDeActividades();

    this.actividadesService.cambioEnActividades().subscribe(
      (borrado => {
        this.obtenerListadoDeActividades();
      })
    );

    this.viajesService.cambioEnViajes().subscribe(
      (borrado => {
        this.obtenerListadoDeActividades();
      })
    );
  }

  private obtenerListadoDeActividades(): void {
    this.viajesService.obtenerListadoViajesActuales$().subscribe(viajes => {
      this.listaViajes = viajes;
    });

    this.actividadesService.obtenerListaActividadesActuales$().subscribe(actividades => {
      this.listaActividades = actividades;
    });
  }

  public redirigirEditarViaje(viaje: Viaje) {
    console.log('QUIERO REDIRIGIR');
    this.router.navigate(['admin/actividades/editar/' + viaje.id]);
  }

}
