import { Component, OnInit } from '@angular/core';

// Modelos
import { Actividad } from '../modelos/actividad.model';
import { Viaje } from '../modelos/viaje.model';

// Para obtener el parámetro de la ruta
import { ActivatedRoute } from '@angular/router';

// Servicios
import { ActividadesService } from '../servicios/actividades.service';
import { ViajesService } from '../servicios/viajes.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  listaActividades: Array<Actividad>;

  clave: string;
  listaActividadesBusqueda: Array<Actividad>;
  listaViajesBusqueda: Array<Viaje>;

  constructor(private actividadesService: ActividadesService,
              private activatedRoute: ActivatedRoute,
              private viajesService: ViajesService) { }

  ngOnInit() {

    this.listaActividadesBusqueda = [];
    this.listaViajesBusqueda = [];

    // SE PODRÍA AHORRAR ESTA BUSQUEDA SI YA TUVIERAMOS LA LISTA??
    this.actividadesService.obtenerListaActividades$().subscribe( response => {
      this.listaActividades = response;
      // Se recoge el parámetro y se usa suscribe
      this.activatedRoute.params.subscribe(params => {
        this.clave = params['clave'];
        this.buscarActividades(params['clave']);
      });
    });

    // LO MISMO PARA VIAJES
    this.viajesService.obtenerListadoViajes$().subscribe( response => {
      this.listaViajesBusqueda = response;
      // Se recoge el parámetro y se usa suscribe
      this.activatedRoute.params.subscribe(params => {
        this.clave = params['clave'];

        // MÉTODO BUSCAR VIAJE POR IDE
        // TODO: implementar
      });
    });

  }

  // AQUI O EN EL SERVICIO???

  public buscarActividades(clave: string): Array<Actividad> {

    clave = clave.toLowerCase();

    for (const actividad of this.listaActividades) {
      actividad.nombre = actividad.nombre.toLowerCase();

      if(actividad.nombre.indexOf(clave) >= 0 ) {
        this.listaActividadesBusqueda.push(actividad);
      }

    }

    return this.listaActividadesBusqueda;

  }



}
