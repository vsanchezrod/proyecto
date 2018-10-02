import { Component, OnInit } from '@angular/core';

// Servicio
import { ViajesService } from '../../servicios/viajes.service';
import {Viaje} from '../../modelos/viaje.model';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  listaViajes: Array<Viaje> = [];

  constructor(private viajesService: ViajesService) { }

  ngOnInit() {

    this.viajesService.obtenerViajes().subscribe(viajes => {
      console.log('lista-viajes component. viajes: ', viajes);
      this.listaViajes = viajes;
    });

    this.viajesService.obtenerViajes2();
  }

}
