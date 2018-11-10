import { Component, OnInit, OnDestroy } from '@angular/core';

// Componentes
import { Actividad } from '../../modelos/actividad.model';

// Servicios
import { ActividadesService } from '../../servicios/actividades.service';

// Para poder recuperar un parámetro de la url
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit, OnDestroy {

  public salida: Actividad = new Actividad();
  private subscripcionActividad: Subscription;

  constructor(private actividadesService: ActividadesService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
     /* Params regresa un observador, que está pendiente de los cambios y para que funcione se necesita suscribirse a ese observador*/
     this.activatedRoute.params.subscribe(parametro => {
      console.log(parametro);
      this.subscripcionActividad = this.actividadesService.obtenerActividadPorId$(parametro['id']).subscribe(
        (response => {
          this.salida = response;
        })
      );
    });
  }

  ngOnDestroy() {
    this.subscripcionActividad.unsubscribe();
  }
}
