import { Component, OnInit, Input} from '@angular/core';

// Modelos
import { Actividad } from '../../modelos/actividad.model';
import { Viaje } from '../../modelos/viaje.model';

// Servicios
import { ActividadesService } from '../../servicios/actividades.service';
import { ViajesService } from '../../servicios/viajes.service';

import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-cancelacion-actividades',
  templateUrl: './modal-cancelacion-actividades.component.html',
  styleUrls: ['./modal-cancelacion-actividades.component.css']
})
export class ModalCancelacionActividadesComponent implements OnInit {

  @Input() actividad: Actividad | Viaje;
  public motivoCancelacion: string;
  public esMotivoIncorrecto: boolean;

  constructor(private actividadesService: ActividadesService,
              private viajesService: ViajesService) { }

  ngOnInit() {}

  public cancelarActividad(): void {

    // Si es una actividad se borra con su servicio correspondiente
    if (this.actividad instanceof Actividad) {
      this.actividadesService.borrarActividad(this.actividad.id, this.motivoCancelacion).subscribe(
        (response: HttpResponse<Actividad>) => {
          console.log(response);
        }
      );
    }

    // Si es un viaje se borra con su servicio correspondiente
    if (this.actividad instanceof Viaje) {
      this.viajesService.borrarViaje(this.actividad.id, this.motivoCancelacion).subscribe(
        (response: HttpResponse<Viaje>) => {
          console.log(response);
        }
      );
    }
  }
}
