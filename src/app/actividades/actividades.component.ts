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

  public listaActividades: Array<Actividad>;
  private suscripcionObtenerListaActividades: Subscription;

  constructor(private actividadesService: ActividadesService) { }

  ngOnInit() {

    console.log('ActividadesComponete: ONINIT');
    this.suscripcionObtenerListaActividades = this.actividadesService.obtenerListaActividades$().subscribe(actividades => {
      this.listaActividades = actividades;
    });
  }

  ngOnDestroy() {
    this.suscripcionObtenerListaActividades.unsubscribe();
    console.log('ActividadesComponete: ONDESTROY');
  }

}
