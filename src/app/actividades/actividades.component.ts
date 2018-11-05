import { Component, OnInit, OnDestroy } from '@angular/core';

// Componente
import { Actividad } from '../modelos/actividad.model';

// Servicio
import { ActividadesService } from '../servicios/actividades.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit, OnDestroy {

  public listaActividadesActuales: Array<Actividad>;
  public listaActividadesRealizadas: Array<Actividad>;
  private subscripcionObtenerListaActividadesActuales: Subscription;
  private subscripcionObtenerListaActividadesRealizadas: Subscription;

  constructor(private actividadesService: ActividadesService) { }

  ngOnInit() {

    this.listaActividadesActuales = [];
    this.listaActividadesRealizadas = [];

    this.subscripcionObtenerListaActividadesActuales = this.actividadesService.obtenerListaActividadesActuales$().subscribe(actividades => {
      this.listaActividadesActuales = actividades;
    });

    this.subscripcionObtenerListaActividadesRealizadas = this.actividadesService.obtenerListaActividadesRealizadas$().subscribe(actividades => {
      this.listaActividadesRealizadas = actividades;
    });
  }

  ngOnDestroy() {
    this.subscripcionObtenerListaActividadesActuales.unsubscribe();
    this.subscripcionObtenerListaActividadesRealizadas.unsubscribe();
  }

}
