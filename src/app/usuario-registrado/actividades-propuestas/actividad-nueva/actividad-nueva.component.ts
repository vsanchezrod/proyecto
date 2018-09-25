import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actividad-nueva',
  templateUrl: './actividad-nueva.component.html',
  styleUrls: ['./actividad-nueva.component.css']
})
export class ActividadNuevaComponent implements OnInit {

  listaCategorias = [
    {id: 1, nombre: 'Bici', descripcion: 'Kaka'},
    {id: 2, nombre: 'Senderismo', descripcion: 'Kaka'},
    {id: 3, nombre: 'Padel', descripcion: 'Kaka'},
    {id: 4, nombre: 'Viajes', descripcion: 'Kaka'},
    {id: 5, nombre: 'Salidas de un día', descripcion: 'Kaka'}
  ];

  niveles = [
    {id: 1, nombre: 'Bajo', descripcion: 'Rutas fáciles y rápidas con desnivel suave'},
    {id: 2, nombre: 'Medio', descripcion: 'Rutas medias con desnivel moderado'},
    {id: 3, nombre: 'Alto', descripcion: 'Rutas largas y con mucho desnivel'}
  ];

  es: any;

  constructor() {
  }

  ngOnInit() {
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
