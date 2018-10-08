import { Component, OnInit } from '@angular/core';

// Componentes
import { Viaje} from '../../modelos/viaje.model';

// Servicios
import { ViajesService } from '../../servicios/viajes.service';

// Recoger parámetros de la URL
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit {

  viaje: Viaje;

  constructor(private viajesService: ViajesService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    /* Params regresa un observador, que está pendiente de los cambios y para que funcione se necesita suscribirse a ese observador*/
    /*this.activatedRoute.params.subscribe(parametro => {
      console.log(parametro);
      this.viaje = this.viajesService.obtenerViaje(parametro['id']);
      console.log(this.viaje);
    });*/

    // this.viaje = this.viajesService.obtenerViaje();
  }
}
