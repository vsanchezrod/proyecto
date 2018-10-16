import { Component, OnInit } from '@angular/core';

// Modelos de datos
import { Actividad } from '../../modelos/actividad.model';

// Servicios
import { ActividadesService } from '../../servicios/actividades.service';

@Component({
  selector: 'app-lista-salidas',
  templateUrl: './lista-salidas.component.html',
  styleUrls: ['./lista-salidas.component.css']
})
export class ListaSalidasComponent implements OnInit {

  listaActividades: Array<Actividad>;

  constructor(private actividadesService: ActividadesService) { }

  ngOnInit() {

    this.actividadesService.obtenerListaActividades$().subscribe(actividades => {
      console.log('lista-actividades component. actividades: ', actividades);
      this.listaActividades = actividades;
    });

  }

}

