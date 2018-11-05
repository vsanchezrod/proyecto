import { Component, OnInit, OnDestroy } from '@angular/core';

// Modelos de datos
import { Viaje } from '../../modelos/viaje.model';

// Servicios
import { ViajesService } from '../../servicios/viajes.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-viajes',
  templateUrl: './lista-viajes.component.html',
  styleUrls: ['./lista-viajes.component.css']
})
export class ListaViajesComponent implements OnInit, OnDestroy {

  public listaViajes: Array<Viaje>;

  private subscripcionListaViajes: Subscription;

  constructor(private viajesService: ViajesService) {}

  ngOnInit() {

    this.subscripcionListaViajes = this.viajesService.obtenerListadoViajesActuales$().subscribe(viajes => {
      this.listaViajes = viajes;
    });
  }

  ngOnDestroy() {
    this.subscripcionListaViajes.unsubscribe();
  }

}
