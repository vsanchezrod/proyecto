import { Component, OnInit } from '@angular/core';

// Componente
import { Actividad } from '../modelos/actividad.model';

// Servicio
import { ActividadesService } from '../servicios/actividades.service';


@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  listaActividades: Array<Actividad>;

  constructor(private actividadesService: ActividadesService) { }

  ngOnInit() {

    this.actividadesService.obtenerListaActividades$().subscribe(actividades => {
      this.listaActividades = actividades;
    });
  }

}
