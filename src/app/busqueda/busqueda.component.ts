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

  public clave: string;
  public listaActividades: Array<Viaje | Actividad> = [];

  public listaActividadesBusqueda: Array<Actividad>;
  public listaViajesBusqueda: Array<Viaje>;

  constructor(private actividadesService: ActividadesService,
              private activatedRoute: ActivatedRoute,
              private viajesService: ViajesService) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        this.listaActividadesBusqueda = [];
        this.listaViajesBusqueda = [];
        console.log('QUERYPARAMS: ', queryParams);
        if (queryParams.categoria !== undefined) {
          this.actividadesService.obtenerListaActividadesPorCategoria$(queryParams.categoria).subscribe(
            (listaActividadesCategoria: Array<Actividad>) => {
              this.listaActividadesBusqueda = listaActividadesCategoria;
          });

          this.viajesService.obtenerListaViajesPorCategoria$(queryParams.categoria).subscribe(
            (listaViajesCategoria: Array<Viaje>) => {
              this.listaViajesBusqueda = listaViajesCategoria;
          });
        }

        if (queryParams.nombre !== undefined) {
          this.listaActividadesBusqueda = [];
          this.listaViajesBusqueda = [];
          console.log('Viene nombre');
          this.listaActividadesBusqueda = this.buscarActividadesPorNombre(queryParams.nombre);
          this.listaViajesBusqueda = this.buscarViajesPorNombre(queryParams.nombre);
        }
    });
  }

  private buscarActividadesPorNombre(nombre: string): Array<Actividad> {

    nombre = nombre.toLowerCase();

    this.actividadesService.obtenerListaActividadesActuales$().subscribe(
      (listaActividadesPorNombre: Array<Actividad>) => {
        for (const actividad of listaActividadesPorNombre) {

          if (actividad.nombre.toLocaleLowerCase().indexOf(nombre) >= 0 ) {
            this.listaActividadesBusqueda.push(actividad);
          }
        }
      }
    );
    return this.listaActividadesBusqueda;

  }

  private buscarViajesPorNombre(nombre: string): Array<Viaje> {

    nombre = nombre.toLowerCase();

    this.viajesService.obtenerListadoViajesActuales$().subscribe(
      (listaViajesPorNombre: Array<Viaje>) => {
        for (const viaje of listaViajesPorNombre) {

          if (viaje.nombre.toLocaleLowerCase().indexOf(nombre) >= 0 ) {
            this.listaViajesBusqueda.push(viaje);
          }
        }
      }
    );
    return this.listaViajesBusqueda;

  }
}
