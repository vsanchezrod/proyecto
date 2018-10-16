import { Component, OnInit } from '@angular/core';

// Modelo de datos
import { Actividad } from '../../../modelos/actividad.model';
import { Categoria } from '../../../modelos/categoria.model';

// Servicio
import { CategoriasService } from '../../../servicios/categorias.service';
import { ActividadesService } from '../../../servicios/actividades.service';

@Component({
  selector: 'app-actividad-nueva',
  templateUrl: './actividad-nueva.component.html',
  styleUrls: ['./actividad-nueva.component.css']
})
export class ActividadNuevaComponent implements OnInit {

  actividad: Actividad;

  distanciaMinima: number;
  distanciaMaxima: number;

  listaCategorias: Array<Categoria> = [];

  imagen: string;
  progreso: number;
  mostrarSpinner: boolean;

  es: any;

  constructor(private categoriaService: CategoriasService,
              private actividadesService: ActividadesService ) {
  }

  ngOnInit() {

    this.actividad = new Actividad();

    this.distanciaMinima = 0;
    this.distanciaMaxima = 150;

   this.categoriaService.obtenerListaCategorias$().subscribe(response => {
     this.listaCategorias = response;
   });

    console.log('ACTIVIDAD: ' + this.actividad);

    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      monthNames: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
        'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
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
      this.actividad.imagen = this.imagen;
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

  crearActividad(datos) {
    this.actividad = datos;
    this.actividad.imagen = this.imagen;
    console.log(this.actividad);
    this.actividadesService.guardarActividad(this.actividad).subscribe( response => {
      console.log('Respuesta: ' + response.status);
    });
  }
}
