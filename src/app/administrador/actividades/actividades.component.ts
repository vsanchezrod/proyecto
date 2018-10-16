import { Component, OnInit } from '@angular/core';

// Servicio
import { ViajesService } from '../../servicios/viajes.service';
import { ActividadesService } from '../../servicios/actividades.service';
import { CategoriasService } from '../../servicios/categorias.service';


import { Viaje } from '../../modelos/viaje.model';
import { Actividad } from '../../modelos/actividad.model';
import { Categoria } from '../../modelos/categoria.model';


@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  listaViajes: Array<Viaje> = [];
  listaActividades: Array<Actividad> = [];
  listaCategorias: Array<Categoria> = [];

  viaje: Viaje;

  distanciaMinima: number;
  distanciaMaxima: number;

  precioMinimo: number;
  precioMaximo: number;

  plazasMinimas: number;
  plazasMaximas: number;

  imagen: string;
  progreso: number;
  mostrarSpinner: boolean;

  es: any;

  constructor(private viajesService: ViajesService,
              private actividadesService: ActividadesService,
              private categoriasService: CategoriasService) { }

  ngOnInit() {

    this.viaje = new Viaje();
    console.log('LISTA PARTICIPANTES',  this.viaje.listaParticipantes);

    this.distanciaMinima = 0;
    this.distanciaMaxima = 150;

    this.precioMinimo = 0;
    this.precioMaximo = 3000;

    this.plazasMinimas = 1;
    this.plazasMaximas = 30;

    this.viajesService.obtenerListadoViajes$().subscribe(viajes => {
      console.log('ActividadesComponent: ObtenerListadoViahjes$: viajes: ', viajes);
      this.listaViajes = viajes;
    });

    this.actividadesService.obtenerListaActividades$().subscribe(actividades => {
      console.log('lista-actividades component. actividades: ', actividades);
      this.listaActividades = actividades;
    });

    this.categoriasService.obtenerListaCategorias$().subscribe( response => {
      this.listaCategorias = response;
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

  public cargarImagen(event: Event): void {
    console.log(event);
    const inputValue: any = event.target;
    const fichero: File = inputValue.files[0];
    const fileReader: FileReader = new FileReader();

    fileReader.onerror = (evento) => {
      this.progreso = 0;
      this.mostrarSpinner = false;
    };

    fileReader.onabort = () => {
      this.progreso = 0;
      this.mostrarSpinner = false;
    };

    fileReader.onloadend = (evento) => {
      this.imagen = fileReader.result;
      this.viaje.imagen = this.imagen;
      this.progreso = 100;
      this.mostrarSpinner = false;
    };

    fileReader.onprogress = (progressEvent) => {
      this.progreso = progressEvent.loaded / progressEvent.total * 100;
    };

    this.progreso = 0;
    fileReader.readAsDataURL(fichero);
    this.mostrarSpinner = true;
  }

  public crearViaje(datos) {
    this.viaje = datos;
    this.viaje.imagen = this.imagen;
    console.log(this.viaje);
    this.viajesService.guardarViaje(this.viaje).subscribe(response => {
      console.log('Respuesta: ' + response.status);
    });
  }

  public borrarActividad(id: string): void {
    console.log('id ' + id);
    /*this.actividadesService.borrarActividad(id).subscribe( response => {
      console.log('Actividad con id ' + id + ' borrada');
    });*/
  }

}
