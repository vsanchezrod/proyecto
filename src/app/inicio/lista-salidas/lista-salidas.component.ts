import { Component, OnInit, OnDestroy } from '@angular/core';

// Modelos de datos
import { Actividad } from '../../modelos/actividad.model';

// Servicios
import { ActividadesService } from '../../servicios/actividades.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-salidas',
  templateUrl: './lista-salidas.component.html',
  styleUrls: ['./lista-salidas.component.css']
})
export class ListaSalidasComponent implements OnInit, OnDestroy {

  public listaActividades: Array<Actividad>;

  private subscripcionListaActividadess: Subscription;

  constructor(private actividadesService: ActividadesService) { }

  ngOnInit() {

    this.subscripcionListaActividadess = this.actividadesService.obtenerListaActividadesActuales$().subscribe(actividades => {
      this.listaActividades = actividades;
    });

  }

  ngOnDestroy() {
    this.subscripcionListaActividadess.unsubscribe();
  }

}

