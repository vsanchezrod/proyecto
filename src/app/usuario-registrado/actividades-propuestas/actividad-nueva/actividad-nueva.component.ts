import { Component, OnInit } from '@angular/core';

// Modelo de datos
import { Salida } from '../../../modelos/salida.model';
import { Categoria } from '../../../modelos/categoria.model';

// Servicio
import { CategoriasService } from '../../../servicios/categorias.service';

@Component({
  selector: 'app-actividad-nueva',
  templateUrl: './actividad-nueva.component.html',
  styleUrls: ['./actividad-nueva.component.css']
})
export class ActividadNuevaComponent implements OnInit {

  salida: Salida;

  distanciaMinima: number;
  distanciaMaxima: number;

  listaCategorias: Array<Categoria> = [];

  es: any;

  constructor(private categoriaService: CategoriasService) {
  }

  ngOnInit() {

    this.salida = new Salida();

    this.distanciaMinima = 1;
    this.distanciaMaxima = 150;

   this.categoriaService.obtenerListaCategorias().subscribe(response => {
     this.listaCategorias = response.body;
   });

    console.log('SALIDA: '  + this.salida);

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

  crearSalida() {
   console.log('Datos enviados');
   console.log(this.salida);
  }
}
