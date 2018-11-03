import { Component, OnInit, OnDestroy } from '@angular/core';

// Servicio
import { ViajesService } from '../servicios/viajes.service';

// Modelos
import {Viaje} from '../modelos/viaje.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit, OnDestroy {

  public listaViajesActuales: Array<Viaje>;
  public listaViajesRealizados: Array<Viaje>;

  private subscripcionObtenerListaViajesActuales: Subscription;
  private subscripcionObtenerListaViajesRealizados: Subscription;

  constructor(private viajesService: ViajesService) { }

  ngOnInit() {

    this.listaViajesActuales = [];

    this.subscripcionObtenerListaViajesActuales = this.viajesService.obtenerListadoViajesActuales$().subscribe(viajes => {
      this.listaViajesActuales = viajes;
    });

    this.subscripcionObtenerListaViajesRealizados = this.viajesService.obtenerListadoViajesRealizados$().subscribe(viajes => {
      this.listaViajesRealizados = viajes;
    });
  }

  ngOnDestroy() {
    this.subscripcionObtenerListaViajesActuales.unsubscribe();
    this.subscripcionObtenerListaViajesRealizados.unsubscribe();
  }
}
