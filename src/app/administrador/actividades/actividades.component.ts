import { Component, OnInit } from '@angular/core';

// Servicio
import { ViajesService } from '../../servicios/viajes.service';
import { SalidasService } from '../../servicios/salidas.service';

import { Viaje } from '../../modelos/viaje.model';
import { Salida } from '../../modelos/salida.model';
import { Categoria } from '../../modelos/categoria.model';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  listaViajes: Array<Viaje> = [];
  listaSalidas: Array<Salida> = [];

  viaje: Viaje;

  distanciaMinima: number;
  distanciaMaxima: number;

  listaCategorias: Array<Categoria> = [];

  es: any;

  constructor(private viajesService: ViajesService,
              private salidasService: SalidasService) { }

  ngOnInit() {

    this.viaje = new Viaje();

    this.distanciaMinima = 1;
    this.distanciaMaxima = 150;

    this.viajesService.obtenerViajes().subscribe(viajes => {
      console.log('lista-viajes component. viajes: ', viajes);
      this.listaViajes = viajes;
    });

    this.viajesService.obtenerViajes2();

    this.salidasService.obtenerSalidas().subscribe( response => {
      this.listaSalidas = response.body;
    });

    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      monthNames: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
      today: 'Hoy',
      clear: 'Borrar'
    };
  }
}
