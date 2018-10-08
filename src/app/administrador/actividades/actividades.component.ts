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

  viaje: Viaje;

  distanciaMinima: number;
  distanciaMaxima: number;

  listaCategorias: Array<Categoria> = [];

  imagen: string;
  progreso: number;
  mostrarSpinner: boolean;

  es: any;

  constructor(private viajesService: ViajesService,
              private actividadesService: ActividadesService,
              private categoriasService: CategoriasService) { }

  ngOnInit() {

    this.viaje = new Viaje();

    this.distanciaMinima = 1;
    this.distanciaMaxima = 150;

    this.viajesService.obtenerViajes().subscribe(viajes => {
      console.log('lista-viajes component. viajes: ', viajes);
      this.listaViajes = viajes;
    });

    this.viajesService.obtenerViajes2();

    this.actividadesService.obtenerListaActividades().subscribe( response => {
      this.listaActividades = response.body;
    });

    this.categoriasService.obtenerListaCategorias().subscribe( response => {
      this.listaCategorias = response.body;
    })

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
      this.viaje.imagen = fileReader.result;
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
}
