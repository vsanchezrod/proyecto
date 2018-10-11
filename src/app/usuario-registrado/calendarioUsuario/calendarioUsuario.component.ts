import { Component, OnInit } from '@angular/core';

import { Evento } from '../../modelos/evento.model';

import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {

    // EJEMPLO
    this.listaEventos = [
      {
        'id': 'EstaIDTIENE QUE SER LA DE LA ACTIVIDAD',
        'title': 'Ruta en bici a Marrupeaaaaa',
        'start': '2018-10-16',
        'tipo': 'actividad'
      },
      {
        'id': 'lallalal',
        'title': 'Ruta en bici a Sotillo de las Palomas',
        'start': '2018-10-17',
        'tipo': 'actividad'
      },
      {
        'id': 'lallalal',
        'title': 'Ruta en bici a Cervera',
        'start': '2018-10-18',
        'end': '2018-10-21',
        'tipo': 'viaje'
      }
    ];
 }

  public verActividad(evento: Evento): void {
    if(evento.tipo = 'actividad') {
      this.router.navigate(['salida', evento.id]);
    }
    else {
      this.router.navigate(['viaje', evento.id]);
    }
  }

}
