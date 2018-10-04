import { Component, OnInit } from '@angular/core';

import { Evento } from '../../modelos/evento.model';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendarioUsuario.component.html',
  styleUrls: ['./calendarioUsuario.component.css']
})
export class CalendarioUsuarioComponent implements OnInit {

  public listaEventos: Array<Evento>;

  // Configuración de la cabecera del calendario
  cabeceraConfiguracion = {
    left:   'today',
    center: 'title',
    right:  'prev,next'
  };

  constructor() { }

  ngOnInit() {

    // EJEMPLO
    this.listaEventos = [
      {
        'id': 'lallalal',
        'title': 'Ruta en bici a Marrupe',
        'start': '2018-10-16'
      },
      {
        'id': 'lallalal',
        'title': 'Ruta en bici a Sotillo de las Palomas',
        'start': '2018-10-17'
      },
      {
        'id': 'lallalal',
        'title': 'Ruta en bici a Cervera',
        'start': '2018-10-18',
        'end': '2018-10-20'
      }
    ];
 }

}
