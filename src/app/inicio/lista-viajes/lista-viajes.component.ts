import { Component, OnInit } from '@angular/core';

// Modelos de datos
import { Viaje } from '../../modelos/viaje.model';

// Servicios
import { ViajesService } from '../../servicios/viajes.service';

@Component({
  selector: 'app-lista-viajes',
  templateUrl: './lista-viajes.component.html',
  styleUrls: ['./lista-viajes.component.css']
})
export class ListaViajesComponent implements OnInit {

  listaViajes: Array<Viaje>;

  constructor(private viajesService: ViajesService) {}

  ngOnInit() {

    this.viajesService.obtenerListadoViajes$().subscribe(viajes => {
      this.listaViajes = viajes;
    });
  }

}
