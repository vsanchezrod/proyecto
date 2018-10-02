import { Component, OnInit } from '@angular/core';

// Servicio
import { ViajesService } from '../servicios/viajes.service';
import {Viaje} from '../modelos/viaje.model';


@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit {

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
