import { Component, OnInit } from '@angular/core';

// Componente
import { Actividad } from '../modelos/actividad.model';

// Servicio
import { ActividadesService } from '../servicios/actividades.service';


@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent implements OnInit {

  listaActividades: Array<Actividad>;

  constructor(private actividadesService: ActividadesService) { }

  ngOnInit() {

    this.actividadesService.obtenerListaActividades().subscribe(response => {
      this.listaActividades = response.body;
    });
  }

}
