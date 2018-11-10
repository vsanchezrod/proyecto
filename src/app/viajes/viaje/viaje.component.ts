import { Component, OnInit, OnDestroy } from '@angular/core';

// Componentes
import { Viaje} from '../../modelos/viaje.model';

// Servicios
import { ViajesService } from '../../servicios/viajes.service';

// Recoger parámetros de la URL
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit, OnDestroy {

  public viaje: Viaje = new Viaje();
  private subscripcionViaje: Subscription;

  constructor(private viajesService: ViajesService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    /* Params regresa un observador, que está pendiente de los cambios y para que funcione se necesita suscribirse a ese observador*/
    this.activatedRoute.params.subscribe(parametro => {
      console.log(parametro);
      this.subscripcionViaje = this.viajesService.obtenerViajePorId$(parametro['id']).subscribe(
        (response => {
          this.viaje = response;
        })
      );
    });
  }

  ngOnDestroy() {
    this.subscripcionViaje.unsubscribe();
  }
}
