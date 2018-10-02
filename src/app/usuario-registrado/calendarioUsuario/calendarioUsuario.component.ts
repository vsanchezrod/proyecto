import { Component, OnInit } from '@angular/core';
import {Coordenada} from '../../modelos/coordenada.model';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendarioUsuario.component.html',
  styleUrls: ['./calendarioUsuario.component.css']
})
export class CalendarioUsuarioComponent implements OnInit {

  public events: Array<any>;

  constructor() { }

  ngOnInit() {

    // EJEMPLO
    this.events = [
      {
        'title': 'Ruta en bici a Marrupe',
        'start': '2018-10-16'
      },
      {
        'title': 'Ruta en bici a Sotillo de las Palomas',
        'start': '2018-10-17'
      },
      {
        'title': 'Ruta en bici a Cervera',
        'start': '2018-10-18'
      }
    ];
 }

}
